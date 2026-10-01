import { Link } from "react-router-dom";
import css from "./HomePage.module.css";
import StatisticInfo from "../../components/StatisticInfo/StatisticInfo";
export default function HomePage() {
  return (
    <main>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.wrapperText}>
            <h1 className={css.title}>
              Unlock your potential with the best{" "}
              <span className={css.spanText}>language</span> tutors
            </h1>
            <p className={css.descr}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <Link to="/teachers" className={css.button}>
              Get started
            </Link>
          </div>
          <div className={css.wrapperPhoto}>
            <img
              className={css.image}
              src="/home-img.jpg"
              alt="girl with laptop"
            />
          </div>
        </div>
      </div>
      <StatisticInfo />
    </main>
  );
}
