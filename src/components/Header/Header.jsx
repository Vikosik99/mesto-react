import React from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";


import logoHeader from "../../images/logo-header.svg"
export default function Header(loggedIn, email, logOut) {
  const location = useLocation();

  return (
    <header className="header">
      <img
        className="logo"
        src={logoHeader}
        alt="логотип"
      />
      <div className="header__authorization">
        {loggedIn && <p className="header__text">{email}</p>}
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link header__button">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link header__button">
                Регистрация
              </Link>
            }
          />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/sign-in"} />}
          />
        </Routes>
        {loggedIn && (
          <button className="header__log" onClick={logOut}>
            {loggedIn ? "Выйти" : location.pathname === "/sign-in" ? "Регистрация" : "Войти"}
          </button>
        )}
      </div>
    </header>
  );
}