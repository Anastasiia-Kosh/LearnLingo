import css from "./Header.module.css";
export default function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.wrapperHeader}>
          <a href="/" className={css.logo}>
            <svg width="24" height="24">
              <use href="/public/sprite.svg#icon-ukraine" />
            </svg>
            LearnLingo
          </a>
          <nav className={css.navigation}>
            <ul className={css.navigLinks}>
              <li className={css.navLink}>
                <a href="/">Home</a>
              </li>
              <li className={css.navLink}>
                <a href="/teachers">Teachers</a>
              </li>
            </ul>
          </nav>
          <ul className={css.navigAuth}>
            <li>
              <a  className={css.logLink} href="/"><svg width="20" height="20">
              <use href="/public/sprite.svg#icon-log-in-01" />
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
