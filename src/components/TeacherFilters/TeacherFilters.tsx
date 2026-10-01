import { useState } from "react";
import css from "./TeacherFilters.module.css";
import { languages, levels, prices } from "../../data/filters";
interface SelectedFilters {
  language: string;
  level: string;
  price: string;
}
interface TeacherFiltersProps {
  selectedFilters: SelectedFilters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

export default function TeacherFilters({
  selectedFilters,
  setSelectedFilters,
}: TeacherFiltersProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  return (
    <div className={css.filters}>
      <div>
        <p>Languages</p>
        <button
          type="button"
          onClick={() =>
              setOpenFilter((prev) => (prev === "language" ? null : "language" ))}
        >
          {selectedFilters.language}
        </button>
        {openFilter === "language" && (
          <ul>
            {languages.map((language) => (
              <li key={language}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      language: language,
                    }));
                    setOpenFilter(null);
                  }}
                >
                  {language}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p>Level of knowledge</p>
        <button type="button" onClick={() => setOpenFilter((prev) => (prev === "level" ? null : "level" ))}>
          {selectedFilters.level}
        </button>
        {openFilter === "level" && (
          <ul>
            {levels.map((level) => (
              <li key={level}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      level: level,
                    }));
                    setOpenFilter(null);
                  }}
                >
                  {level}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p>Price</p>
        <button type="button" onClick={() => setOpenFilter((prev) => (prev === "price" ? null : "price" ))}>
          {selectedFilters.price}
        </button>
        {openFilter === "price" && (
          <ul>
            {prices.map((price) => (
              <li key={price}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      price: price,
                    }));
                    setOpenFilter(null);
                  }}
                >
                  {price}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
