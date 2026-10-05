import { useEffect, useState } from "react";
import { getTeachers, getAllTeachers } from "../../firebase/teachers";
import css from "./TeachersPage.module.css";
import type { Teacher } from "../../types/teacher";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useAuth } from "../../context/useAuth";
import { getFavorites } from "../../firebase/favorites";
import TeacherFilters from "../../components/TeacherFilters/TeacherFilters";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const PER_PAGE = 4;

export default function TeachersPage() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState({
    language: "All languages",
    level: "All levels",
    price: "Any price",
  });
  const hasActiveFilters =
    selectedFilters.language !== "All languages" ||
    selectedFilters.level !== "All levels" ||
    selectedFilters.price !== "Any price";

  const handleFilterChange = (
    filter: "language" | "level" | "price",
    value: string,
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: value,
    }));

    setPage(1);
    setIsLoading(true);
  };

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        if (hasActiveFilters) {
          const data = await getAllTeachers();

          setTeachers(data);
          setLastKey(null);
          setHasMore(false);
        } else {
          const data = await getTeachers();

          setTeachers(data.teachers);
          setLastKey(data.lastKey);
          setHasMore(data.hasMore);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeachers();
  }, [hasActiveFilters, selectedFilters]);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesLanguage =
      selectedFilters.language === "All languages" ||
      teacher.languages.includes(selectedFilters.language);

    const matchesLevel =
      selectedFilters.level === "All levels" ||
      teacher.levels.includes(selectedFilters.level);

    const matchesPrice =
      selectedFilters.price === "Any price" ||
      teacher.price_per_hour === Number(selectedFilters.price);

    return matchesLanguage && matchesLevel && matchesPrice;
  });

  const visibleTeachers = hasActiveFilters
    ? filteredTeachers.slice(0, page * PER_PAGE)
    : filteredTeachers;

  const canLoadMore = hasActiveFilters
    ? visibleTeachers.length < filteredTeachers.length
    : hasMore;

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadFavorites = async () => {
      try {
        const ids = await getFavorites(user.uid);
        setFavoriteIds(ids);
      } catch {
        toast.error("Failed to load favorites.");
      }
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
          onFilterChange={handleFilterChange}
        />

        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>Failed to load teachers.</p>
        ) : filteredTeachers.length === 0 ? (
          <div className={css.emptyState}>
            <p>No teachers found matching your filters.</p>
            <p>
              Try another language, level, or price to find your next teacher.
            </p>

            <button
              className={css.buttonReset}
              onClick={() => {
                setSelectedFilters({
                  language: "All languages",
                  level: "All levels",
                  price: "Any price",
                });
                setPage(1);
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
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
        )}

        {canLoadMore && (
          <button
            type="button"
            className={css.button}
            disabled={isLoadingMore}
            onClick={async () => {
              if (hasActiveFilters) {
                setPage((prev) => prev + 1);
                return;
              }

              setIsLoadingMore(true);

              try {
                const data = await getTeachers(lastKey ?? undefined);

                setTeachers((prev) => [...prev, ...data.teachers]);
                setLastKey(data.lastKey);
                setHasMore(data.hasMore);
              } catch {
                toast.error("Failed to load more teachers.");
              } finally {
                setIsLoadingMore(false);
              }
            }}
          >
            {isLoadingMore ? <Loader size="small" /> : "Load more"}
          </button>
        )}
      </div>
    </main>
  );
}
