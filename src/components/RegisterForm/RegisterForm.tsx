import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../firebase/auth";
import css from "./AuthForms.module.css";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import { useState } from "react";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}
interface RegisterFormProps {
  onClose: () => void;
}
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data.name, data.email, data.password);

      toast.success(`${data.name}, you have successfully registered!`);
      onClose();
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    }
  };

  return (
    <>
      <button type="button" className={css.closeButton} onClick={onClose}>
        <svg width="16" height="16">
          <use href="/sprite.svg#icon-x-icon" />
        </svg>
      </button>

      <h2 className={css.title}>Registration</h2>

      <p className={css.description}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.formFields}>
          <label
            className={`${css.formInput} ${errors.name ? css.inputError : ""}`}
          >
            <input type="text" {...register("name")} placeholder="Name" />
          </label>
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
          <label
            className={`${css.formInput} ${errors.email ? css.inputError : ""}`}
          >
            <input type="email" {...register("email")} placeholder="Email" />
          </label>
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
          <label
            className={`${css.formInput} ${errors.password ? css.inputError : ""}`}
          >
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
            />
            <button
              type="button"
              className={css.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg width="20" height="20">
                <use
                  href={
                    showPassword
                      ? "/sprite.svg#icon-eye-open"
                      : "/sprite.svg#icon-eye-off"
                  }
                />
              </svg>
            </button>
          </label>
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>

        <button className={css.formButton} type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}
