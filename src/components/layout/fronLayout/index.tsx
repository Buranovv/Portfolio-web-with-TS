import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

import useAuth from "../../../zustand/auth";

import "./header.scss";

const Header = () => {
  const [togle, setTogle] = useState(false);

  const { isAuth } = useAuth();

  const togleOpen = () => {
    setTogle(true);
    document.body.style.overflow = "hidden";
  };
  const togleClose = () => {
    setTogle(false);
    document.body.style.overflow = "auto";
  };

  return (
    <Fragment>
      <header className="header">
        <div className="container">
          <div className="header__box">
            <NavLink to="/">
              <div draggable className="logo-box">
                <img
                  style={{ width: 40, height: 30 }}
                  src="/logo.png"
                  alt="site logo"
                />
                <p>Portfolio</p>
              </div>
            </NavLink>
            <nav className="header__nav">
              <ul className="header__list">
                <li className="header__item">
                  <NavLink className="header__link" to="/">
                    Home
                  </NavLink>
                </li>
              </ul>
              <div>
                {isAuth ? (
                  <NavLink to="/account" className="header__loginPage">
                    Account
                  </NavLink>
                ) : (
                  <NavLink to="/auth/login" className="header__loginPage">
                    Login
                  </NavLink>
                )}
              </div>
            </nav>

            <div className="togle__menu" onClick={togleOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
              >
                <rect width="20" height="3" fill="black" />
                <rect y="7" width="20" height="3" fill="black" />
                <rect y="14" width="20" height="3" fill="black" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <div className={togle ? "shadow" : ""} onClick={togleClose}></div>

      <div className={`togle ${togle ? "show" : ""}`}>
        <div className="togle__list">
          <div className="togle__close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              onClick={togleClose}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99989 6.37869L2.98948 0.368286L0.868164 2.48961L6.87857 8.50001L0.868164 14.5104L2.98948 16.6317L8.99989 10.6213L15.0103 16.6317L17.1316 14.5104L11.1212 8.50001L17.1316 2.48961L15.0103 0.368286L8.99989 6.37869Z"
                fill="black"
              />
            </svg>
          </div>
          <NavLink className="togle__link" to="/" onClick={togleClose}>
            Home
          </NavLink>
          {isAuth ? (
            <NavLink
              className="togle__link"
              style={{ backgroundColor: "var(lyt-txt-clr)" }}
              to="/account"
              onClick={togleClose}
            >
              Account
            </NavLink>
          ) : (
            <NavLink
              className="togle__link"
              style={{ backgroundColor: "var(lyt-txt-clr)" }}
              to="/auth/login"
              onClick={togleClose}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
