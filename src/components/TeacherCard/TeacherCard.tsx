import type { Teacher } from "../../types/teacher";
import TrialLessonModal from "../TrialLessonModal/TrialLessonModal";
import css from "./TeacherCard.module.css";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { addFavorite, removeFavorite } from "../../firebase/favorites";
import toast from "react-hot-toast";

interface TeacherProps {
  teacher: Teacher;
  isFavorite: boolean;
  onFavoriteToggle: (teacherId: string) => void;
}

export default function TeacherCard({
  teacher,
  onFavoriteToggle,
  isFavorite,
}: TeacherProps) {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  const handleFavoriteClick = async () => {
    if (!user) {
      toast.error(
        "This feature is available only to authorized users. Please log in or register.",
      );
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(user.uid, teacher.id);
      } else {
        await addFavorite(user.uid, teacher.id);
      }

      onFavoriteToggle(teacher.id);
    } catch {
      toast.error(
        isFavorite
          ? "Failed to remove teacher from favorites."
          : "Failed to add teacher to favorites.",
      );
    }
  };
  return (
    <article className={css.teacherCard}>
      <div className={css.avatarWrap}>
        <img
          className={css.avatar}
          src={teacher.avatar_url}
          alt={teacher.name}
        />
      </div>
      <div className={css.textWrap}>
        <div className={css.headWrap}>
          <div className={css.userWrap}>
            <p className={css.colorCard}>Languages</p>
            <h3 className={css.user}>
              {teacher.name} {teacher.surname}
            </h3>
          </div>
          <div className={css.wrapRating}>
            <p className={css.iconBook}>
              <svg width="16" height="16">
                <use href="/sprite.svg#icon-book" />
              </svg>
              Lessons online
            </p>
            <svg width="1" height="16">
              <use href="/sprite.svg#icon-stroke" />
            </svg>
            <p>Lessons done: {teacher.lessons_done}</p>
            <svg width="1" height="16">
              <use href="/sprite.svg#icon-stroke" />
            </svg>
            <p className={css.iconBook}>
              <svg width="16" height="16">
                <use href="/sprite.svg#icon-star" />
              </svg>
              Rating: {teacher.rating}
            </p>
            <svg width="1" height="16">
              <use href="/sprite.svg#icon-stroke" />
            </svg>
            <p>
              Price / 1 hour:
              <span className={css.colorPrice}> {teacher.price_per_hour}$</span>
            </p>
            <button
              type="button"
              className={css.buttonHeart}
              onClick={handleFavoriteClick}
            >
              <svg
                width="26"
                height="26"
                className={isFavorite ? css.favorite : ""}
              >
                <use href="/sprite.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>

        <ul className={css.teachInfo}>
          <li>
            <span className={css.colorCard}>Speaks: </span>
            {teacher.languages.join(", ")}
          </li>
          <li>
            <span className={css.colorCard}>Lesson Info: </span>
            {teacher.lesson_info}
          </li>
          <li>
            <span className={css.colorCard}>Conditions: </span>
            {teacher.conditions.join(" ")}
          </li>
        </ul>
        {!isExpanded && (
          <button
            type="button"
            className={css.buttonLink}
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}
        {isExpanded && (
          <>
            <p className={css.experience}>{teacher.experience}</p>
            <ul className={css.reviewList}>
              {teacher.reviews.map((review) => (
                <li key={review.reviewer_name} className={css.reviewCard}>
                  <p className={css.reviewName}>{review.reviewer_name}</p>
                  <div className={css.reviewWrap}>
                    <svg width="16" height="16">
                      <use href="/sprite.svg#icon-star" />
                    </svg>
                    <p className={css.reviewRating}>{review.reviewer_rating}</p>
                  </div>
                  <p className={css.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        <ul className={css.levelList}>
          {teacher.levels.map((level) => (
            <li key={level} className={css.level}>
              {level}
            </li>
          ))}
        </ul>
        {isExpanded && (
          <button
            type="button"
            className={css.buttonTrial}
            onClick={() => setIsTrialOpen(true)}
          >
            Book trial lesson
          </button>
        )}
      </div>
      {isTrialOpen && (
        <TrialLessonModal
          onClose={() => setIsTrialOpen(false)}
          teacher={teacher}
        />
      )}
    </article>
  );
}
