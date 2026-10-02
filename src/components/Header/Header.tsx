import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { useEffect, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import Modal from "../Modal/Modal";
import { useAuth } from "../../context/useAuth";
import { logoutUser } from "../../firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch {
      toast.error("Failed to log out");
    }
  };

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.wrapperHeader}>
          <Link to="/" className={css.logo}>
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-ukraine" />
            </svg>
            LearnLingo
          </Link>
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
            {user ? (
              <>
                <li className={css.navLink}>
                  <Link to="/favorites">Favorites</Link>
                </li>
                <li className={css.logUserName}>
                  {user.displayName || user.email}
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={css.logOutLink}
                  >
                    Log out
                    <svg width="20" height="20">
                      <use href="/sprite.svg#icon-log-out" />
                    </svg>
                  </button>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>

          {!isMenuOpen && (
            <button
              type="button"
              className={css.burgerButton}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="24" height="24">
                <use href="/sprite.svg#icon-burger" />
              </svg>
            </button>
          )}

          {isMenuOpen && (
            <button
              type="button"
              className={css.burgerButtonClose}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24">
                <use href="/sprite.svg#icon-x-icon" />
              </svg>
            </button>
          )}

          <div
            className={`${css.mobileMenu} ${isMenuOpen ? css.menuOpen : ""}`}
          >
            <nav className={css.mobileNavigation}>
              <ul className={css.mobileNavigationList}>
                {user && (
                  <li className={css.logUserName}>
                    {user.displayName || user.email}
                  </li>
                )}
                <li className={css.navLink}>
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li className={css.navLink}>
                  <Link to="/teachers" onClick={() => setIsMenuOpen(false)}>
                    Teachers
                  </Link>
                </li>

                {user ? (
                  <>
                    <li className={css.navLink}>
                      <Link
                        to="/favorites"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Favorites
                      </Link>
                    </li>

                    <li>
                      <button
                        className={css.authLinkMobile}
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleLogout();
                        }}
                      >
                        Log out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        className={css.authLinkMobile}
                        type="button"
                        onClick={() => {
                          setIsLoginOpen(true);
                          setIsMenuOpen(false);
                        }}
                      >
                        Log in
                      </button>
                    </li>

                    <li>
                      <button
                        className={css.authLinkMobile}
                        type="button"
                        onClick={() => {
                          setIsRegisterOpen(true);
                          setIsMenuOpen(false);
                        }}
                      >
                        Registration
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>

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
