import "./Login.css";
import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
      <form className="authform" noValidate>
        <div className="authform__fields">
          <div className="authform__logo"></div>
          <h2 className="authform__title">Рады видеть!</h2>
          <label className="authform__label">E-mail</label>
          <input
            required
            type="email"
            className="authform__input"
            name="email"
            value="pochta@yandex.ru|"
          ></input>
          <span className="authform__error"></span>
          <label className="authform__label">Пароль</label>
          <input
            required
            type="password"
            minLength="8"
            value=""
            name="password"
            className="authform__input"
          ></input>
          <span className="authform__error"></span>
        </div>
        <div className="authform__submit">
          <span className="form__submit-error"></span>
          <button className="authform__submit-button" type="submit">
            Войти
          </button>
          <div className="authform__link">
            <span className="authform__span">Еще не зарегистрированы?</span>
            <Link to="/signup" className="authform__link-button">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
