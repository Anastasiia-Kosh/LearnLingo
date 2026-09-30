import { useEffect, useState } from "react";
import { getTeachers } from "../../firebase/teachers";
import css from "./TeachersPage.module.css";
import type { Teacher } from "../../types/teacher";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useAuth } from "../../context/useAuth";
import { getFavorites } from "../../firebase/favorites";

export default function TeachersPage() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PER_PAGE = 4;
  useEffect(() => {
    const loadTeachers = async () => {
      const data = await getTeachers(page, PER_PAGE);
      if (data.length < PER_PAGE) {
        setHasMore(false);
      }
      if (page === 1) {
        setTeachers(data);
      } else {
        setTeachers((prev) => [...prev, ...data]);
      }
    };

    loadTeachers();
  }, [page]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadFavorites = async () => {
      const ids = await getFavorites(user.uid);
      setFavoriteIds(ids);
    };

    loadFavorites();
  }, [user]);

  const handleFavoriteToggle = (teacherId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId],
    );
  };

  return (
    <main className={css.page}>
      <div className="container">
        <p>Фільтр</p>
        <ul className={css.teacherList}>
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <TeacherCard
                teacher={teacher}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={favoriteIds.includes(teacher.id)}
              />
            </li>
          ))}
        </ul>
        {hasMore && (
          <button
            type="button"
            className={css.button}
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            Load more
          </button>
        )}
      </div>
    </main>
  );
}
