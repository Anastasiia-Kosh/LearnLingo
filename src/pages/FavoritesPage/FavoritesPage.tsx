import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import type { Teacher } from "../../types/teacher";
import { getTeachers } from "../../firebase/teachers";
import { getFavorites, removeFavorite } from "../../firebase/favorites";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import css from "./FavoritesPage.module.css";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const loadFavoriteTeachers = async () => {
      if (!user) {
        return;
      }
      const favoriteIds = await getFavorites(user.uid);
      const teachers = await getTeachers();
      const favoriteTeachers = teachers.filter((teacher) =>
        favoriteIds.includes(teacher.id),
      );
      setTeachers(favoriteTeachers);
    };
    loadFavoriteTeachers();
  }, [user]);

  const handleFavoriteToggle = async (teacherId: string) => {
    if (!user) {
      return;
    }
    await removeFavorite(user.uid, teacherId);

    setTeachers((prev) => prev.filter((teacher) => teacher.id !== teacherId));
  };

  return (
    <main className={css.page}>
      <div className="container">
        <h1 className={css.title}>My favorite teachers</h1>

        {teachers.length === 0 ? (
          <>
            <p>You have no favorite teachers yet.<br/> Choose them right now.</p>
            <Link className={css.button} to="/teachers">
              Go to teachers
            </Link>
          </>
        ) : (
          <ul className={css.teacherList}>
            {teachers.map((teacher) => (
              <li key={teacher.id}>
                <TeacherCard
                  teacher={teacher}
                  isFavorite
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
