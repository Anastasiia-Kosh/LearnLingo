import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import type { Teacher } from "../../types/teacher";
import { getTeachers } from "../../firebase/teachers";
import { getFavorites, removeFavorite } from "../../firebase/favorites";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./FavoritesPage.module.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const PER_PAGE = 4;

export default function FavoritesPage() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadFavoriteTeachers = async () => {
      try {
        if (!user) {
          return;
        }

        const favoriteIds = await getFavorites(user.uid);
        const teachers = await getTeachers();

        const favoriteTeachers = teachers.filter((teacher) =>
          favoriteIds.includes(teacher.id),
        );

        setTeachers(favoriteTeachers);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavoriteTeachers();
  }, [user]);

  const handleFavoriteToggle = async (teacherId: string) => {
    if (!user) {
      return;
    }

    try {
      await removeFavorite(user.uid, teacherId);

      setTeachers((prev) => prev.filter((teacher) => teacher.id !== teacherId));
    } catch {
      toast.error("Failed to remove teacher from favorites.");
    }
  };

  const visibleTeachers = teachers.slice(0, page * PER_PAGE);
  const hasMore = visibleTeachers.length < teachers.length;

  return (
    <main className={css.page}>
      <div className="container">
        <h1 className={css.title}>My favorite teachers</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>Failed to load favorite teachers.</p>
        ) : teachers.length === 0 ? (
          <div className={css.emptyState}>
            <p>You have no favorite teachers yet. </p>
            <p>Choose them right now.</p>
            <Link className={css.button} to="/teachers">
              Go to teachers
            </Link>
          </div>
        ) : (
          <>
            <ul className={css.teacherList}>
              {visibleTeachers.map((teacher) => (
                <li key={teacher.id}>
                  <TeacherCard
                    teacher={teacher}
                    isFavorite
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                </li>
              ))}
            </ul>
            {hasMore && (
              <button
                type="button"
                className={css.buttonLoad}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </main>
  );
}
