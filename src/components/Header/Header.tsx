import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import Modal from "../Modal/Modal";

export default function Header() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
              <button
                type="button"
                className={css.logLink}
                onClick={() => setIsLoginOpen(true)}
              >
                <svg width="20" height="20">
                  <use href="/sprite.svg#icon-log-in-01" />
                </svg>
                Log in
              </button>
            </li>
            <li>
              <button
                className={css.regLink}
                onClick={() => setIsRegisterOpen(true)}
              >
                Registration
              </button>
            </li>
          </ul>

          {isLoginOpen && (
            <Modal
              onClose={() => setIsLoginOpen(false)}
              className={css.authModal}
            >
              <LoginForm onClose={() => setIsLoginOpen(false)} />
            </Modal>
          )}
          {isRegisterOpen && (
            <Modal
              onClose={() => setIsRegisterOpen(false)}
              className={css.authModal}
            >
              <RegisterForm onClose={() => setIsRegisterOpen(false)} />
            </Modal>
          )}
        </div>
      </div>
    </header>
  );
}
