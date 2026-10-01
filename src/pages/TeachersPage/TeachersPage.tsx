import { useEffect, useState } from "react";
import { getTeachers } from "../../firebase/teachers";
import css from "./TeachersPage.module.css";
import type { Teacher } from "../../types/teacher";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useAuth } from "../../context/useAuth";
import { getFavorites } from "../../firebase/favorites";
import TeacherFilters from "../../components/TeacherFilters/TeacherFilters";

const PER_PAGE = 4;

export default function TeachersPage() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState({
    language: "All languages",
    level: "All levels",
    price: "Any price",
  });

  useEffect(() => {
    const loadTeachers = async () => {
      const data = await getTeachers(page, PER_PAGE);
      setTeachers(data);
    };

    loadTeachers();
  }, []);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesLanguage =
      selectedFilters.language === "All languages" ||
      teacher.languages.includes(selectedFilters.language);
    
    const matchesLevel = selectedFilters.level === "All levels" || teacher.levels.includes(selectedFilters.level);
    
    const matchesPrice = selectedFilters.price === "Any price" || teacher.price_per_hour === Number(selectedFilters.price);

    return matchesLanguage && matchesLevel && matchesPrice;
  });

  const visibleTeachers = filteredTeachers.slice(0, page * PER_PAGE)
  
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
        <h1 className="visually-hidden">TeachersPage</h1>
        <TeacherFilters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <ul className={css.teacherList}>
          {visibleTeachers.map((teacher) => (
            <li key={teacher.id}>
              <TeacherCard
                teacher={teacher}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={favoriteIds.includes(teacher.id)}
              />
            </li>
          ))}
        </ul>
        {/* {hasMore && (
          <button
            type="button"
            className={css.button}
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            Load more
          </button>
        )} */}
        <button
  type="button"
  className={css.button}
  onClick={() => {
    setPage((prev) => prev + 1);
  }}
>
  Load more
</button>
      </div>
    </main>
  );
}

// English: 10
// French: 9
// German: 4
// Italian: 2
// Korean: 1
// Mandarin Chinese: 6
// Spanish: 9
// Vietnamese: 1

