import { Link } from "react-router-dom";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.wrapperHeader}>
          <a href="/" className={css.logo}>
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-ukraine" />
            </svg>
            LearnLingo
          </a>
          <nav className={css.navigation}>
            <ul className={css.navigLinks}>
              <li className={css.navLink}>
                <Link to="/">Home</Link>
              </li>
              <li className={css.navLink}>
                <Link to="/teachers">Teachers</Link>
              </li>
            </ul>
          </nav>
          <ul className={css.navigAuth}>
            <li>
              <a  className={css.logLink} href="/"><svg width="20" height="20">
              <use href="/sprite.svg#icon-log-in-01" />
            </svg>Log in</a>
            </li>
            <li className={css.regLink}>
              <a href="/">Registration</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
