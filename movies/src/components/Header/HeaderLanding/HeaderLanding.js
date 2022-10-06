import "./HeaderLanding.css";
import React from "react";

function HeaderLanding() {
  return (
    <header className="header-landing">
        <div className="header-landing__logo-container">
        <a className="header-landing__logo" href="/">
        </a>
      </div>
        <div className="header-landing__profile">
          <a className="header-landing__profile-link" href="/signup">
            Регистрация
          </a>
          <a className="header-landing__profile-link" href="/signin">
            Войти
          </a>
        </div>
    </header>
  );
}

export default HeaderLanding;
