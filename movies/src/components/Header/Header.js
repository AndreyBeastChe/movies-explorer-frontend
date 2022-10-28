
import React from "react";
import { Link, NavLink} from "react-router-dom";
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
            <NavLink
             exact activeClassName="header__films-link_active"
              to="/movies"
              className="header__films-link"
            >
              Фильмы
            </NavLink>
            <NavLink
              exact activeClassName="header__films-link_active"
              to="/saved-movies"
              className="header__films-link"
            >
              Сохранённые фильмы
            </NavLink>
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