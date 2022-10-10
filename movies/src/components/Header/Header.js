
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import profile from "../../images/profile.svg";


function Header(props) {
  return (
    <header className="header">
      <div className="header__container">
      <div className="header-landing__logo-container">
        <a className="header-landing__logo" href="/">
        </a>
      </div>
          <div className="header__films">
            <Link
              to="/movies"
              className="header__films-link"
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className="header__films-link"
            >
              Сохранённые фильмы
            </Link>
          </div>
        <div className="header__account">
          <a href="/profile" className="header__account-button">
            <img
              className="header__account-user"
              src={profile}
              alt="аккаунт"
            />
            Аккаунт
          </a>
        </div>
      </div>
      <div className="header__burger">
        <button
          className="header__menu"
          id="show__menu"
          onClick={props.onEditMenu}
          type="button"
        ></button>
     </div>
    </header>
  );
}

export default Header;