import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import profile from "../../images/profile.svg";

function Navigation(props) {
  return (
    <div className={`navigation ${props.isOpen ? "navigation_opened" : ""}`}>
      <nav className="navigation__container">
        <div className="navigation__links">
          <button
            className="navigation__close"
            onClick={props.onClose}
            type="button"
          ></button>
          <NavLink exact activeClassName="navigation__link_active" to="/" className="navigation__link">
            Главная
          </NavLink>
          <NavLink exact activeClassName="navigation__link_active" to="/movies" className="navigation__link">
            Фильмы
          </NavLink>
          <NavLink exact activeClassName="navigation__link_active" to="/saved-movies" className="navigation__link">
            Сохранённые фильмы
          </NavLink>
        </div>
        <div className="navigation__profile">
          <a href="/profile" className="navigation__profile-button">
            <img
              className="navigation__account-profile"
              src={profile}
              alt="аккаует"
            />
            Аккаунт
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;