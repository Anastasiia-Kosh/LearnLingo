import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../../firebase/auth";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import css from "../RegisterForm/AuthForms.module.css";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginFormProps {
  onClose: () => void;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginForm({ onClose }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("You have successfully logged in!");
      onClose();
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          toast.error("Invalid email or password.");
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

      <h2 className={css.title}>Log in</h2>

      <p className={css.description}>
        Welcome back! Please enter your credentials to continue.
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.formFields}>
          <label
            className={`${css.formInput} ${errors.email ? css.inputError : ""}`}
          >
            <input type="email" {...register("email")} placeholder="Email" />
          </label>

          {errors.email && <p className={css.error}>{errors.email.message}</p>}

          <label
            className={`${css.formInput} ${
              errors.password ? css.inputError : ""
            }`}
          >
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
            />
          </label>

          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>

        <button className={css.formButton} type="submit">
          Log in
        </button>
      </form>
    </>
  );
}
