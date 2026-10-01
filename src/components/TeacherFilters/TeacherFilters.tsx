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
  onFilterChange: (
    filter: "language" | "level" | "price",
    value: string,
  ) => void;
}

export default function TeacherFilters({
  selectedFilters,
  onFilterChange,
}: TeacherFiltersProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  return (
    <div className={css.filters}>
      <div className={css.filter}>
        <p className={css.label}>Languages</p>
        <button
          type="button"
       className={css.filterButton}
          onClick={() =>
            setOpenFilter((prev) => (prev === "language" ? null : "language"))
          }
        >
          {selectedFilters.language}
          <svg className={`${css.icon} ${
    openFilter === "language" ? css.iconOpen : ""
  }`} width="10" height="5">
            <use href="/sprite.svg#icon-v" />
          </svg>
        </button>
        {openFilter === "language" && (
          <ul className={css.dropdown}>
            {languages.map((language) => (
              <li key={language}>
                <button
                  type="button"
                  className={`${css.option} ${
                    selectedFilters.language === language ? css.selected : ""
                  }`}
                  onClick={() => {
                    onFilterChange("language", language);
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

      <div className={css.filter}>
        <p className={css.label}>Level of knowledge</p>
        <button
      
          type="button"
      className={css.filterButton}
          onClick={() =>
            setOpenFilter((prev) => (prev === "level" ? null : "level"))
          }
        >
          {selectedFilters.level}
          <svg className={`${css.icon} ${
    openFilter === "level" ? css.iconOpen : ""
  }`} width="10" height="5">
            <use href="/sprite.svg#icon-v" />
          </svg>
        </button>
        {openFilter === "level" && (
          <ul className={css.dropdown}>
            {levels.map((level) => (
              <li key={level}>
                <button
                  type="button"
                  className={`${css.option} ${
                    selectedFilters.level === level ? css.selected : ""
                  }`}
                  onClick={() => {
                    onFilterChange("level", level);
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

      <div className={css.filter}>
        <p className={css.label}>Price</p>
        <button
          
          type="button"
    className={css.filterButton}
          onClick={() =>
            setOpenFilter((prev) => (prev === "price" ? null : "price"))
          }
        >
          {selectedFilters.price === "Any price" ? selectedFilters.price : `${selectedFilters.price} $`}
     
          <svg className={`${css.icon} ${
    openFilter === "price" ? css.iconOpen : ""
  }`} width="10" height="5">
            <use href="/sprite.svg#icon-v" />
          </svg>
        </button>
        {openFilter === "price" && (
          <ul className={css.dropdown}>
            {prices.map((price) => (
              <li key={price}>
                <button
                  type="button"
                      className={`${css.option} ${
                    selectedFilters.price === price ? css.selected : ""
                  }`}
                  onClick={() => {
                    onFilterChange("price", price);
                    setOpenFilter(null);
                  }}
                >
                  {price === "Any price" ? price : `${price} $`}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
