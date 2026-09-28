import type { Teacher } from "../../types/teacher";
import Modal from "../Modal/Modal";
import css from "./TrialLessonModal.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

interface TrialLessonModalProps {
  onClose: () => void;
  teacher: Teacher;
}
interface TrialLessonForm {
  reason: string;
  fullName: string;
  email: string;
  phone: string;
}
const schema = yup.object({
  reason: yup.string().required("Please choose a reason"),
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

export default function TrialLessonModal({
  onClose,
  teacher,
}: TrialLessonModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrialLessonForm>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: TrialLessonForm) => {
    toast.success(`${data.fullName}, trial lesson booked successfully!`);
    onClose();
  };
  return (
    <Modal onClose={onClose}>
      <button type="button" className={css.closeButton} onClick={onClose}>
        <svg width="16" height="16">
          <use href="/sprite.svg#icon-x-icon" />
        </svg>
      </button>

      <h2 className={css.title}>Book trial lesson</h2>

      <p className={css.description}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={css.teacherWrapper}>
        <img
          src={teacher.avatar_url}
          alt={teacher.name}
          className={css.avatar}
        />
        <div className={css.teacherInfo}>
          <p className={css.teacherText}>Your teacher</p>
          <p className={css.userName}>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={css.formTitle}>
          What is your main reason for learning {teacher.languages.join(" or ")}
          ?
        </h3>
        <div className={css.formRadio}>
          <label>
            <input
              className={css.radio}
              type="radio"
              value="Career and business"
              {...register("reason")}
            />
            Career and business
          </label>

          <label>
            <input
              className={css.radio}
              type="radio"
              value="Lesson for kids"
              {...register("reason")}
            />
            Lesson for kids
          </label>
          <label>
            <input
              className={css.radio}
              type="radio"
              value="Living abroad"
              {...register("reason")}
            />
            Living abroad
          </label>
          <label>
            <input
              className={css.radio}
              type="radio"
              value="Exams and coursework"
              {...register("reason")}
            />
            Exams and coursework
          </label>
          <label>
            <input
              className={css.radio}
              type="radio"
              value="Culture, travel or hobby"
              {...register("reason")}
            />
            Culture, travel or hobby
          </label>
          {errors.reason && (
            <p className={css.error}>{errors.reason.message}</p>
          )}
        </div>

        <div className={css.formFields}>
          <label
            className={`${css.formInput} ${
              errors.fullName ? css.inputError : ""
            }`}
          >
            <input
              type="text"
              {...register("fullName")}
              placeholder="Full Name"
            />
          </label>
          {errors.fullName && (
            <p className={css.error}>{errors.fullName.message}</p>
          )}
          <label
            className={`${css.formInput} ${errors.email ? css.inputError : ""}`}
          >
            <input type="email" {...register("email")} placeholder="Email" />
          </label>
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
          <label
            className={`${css.formInput} ${errors.phone ? css.inputError : ""}`}
          >
            <input
              type="tel"
              {...register("phone")}
              placeholder="Phone number"
            />
          </label>
          {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
        </div>

        <button className={css.formButton} type="submit">
          Book
        </button>
      </form>
    </Modal>
  );
}
