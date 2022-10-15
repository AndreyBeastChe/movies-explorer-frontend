import "./Login.css";
import React from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.Log(props.values);
  };

  const errorStatus = (status) => {
    if (status === "400") {
      return "Неправильный логин или пароль.";
    }
    if (status === "401") {
      return "Ошибка авторизации";
    }
    if (status === "500") {
      return "На сервере произошла ошибка.";
    }
  };

  const errorMessage = errorStatus(props.submitErr);

  return (
    <main>
      <section className="login">
        <form className="authform" noValidate onSubmit={handleSubmit}>
          <div className="authform__fields">
            <div className="authform__logo"></div>
            <h2 className="authform__title">Рады видеть!</h2>
            <label className="authform__label">E-mail</label>
            <input
              required
              type="email"
              className="authform__input"
              name="email"
              onChange={props.handleChange}
              value={props.values.email}
            ></input>
            <span className="authform__error">{props.errors.email}</span>
            <label className="authform__label">Пароль</label>
            <input
              required
              type="password"
              minLength="8"
              onChange={props.handleChange}
              value={props.values.password}
              name="password"
              className="authform__input"
            ></input>
            <span className="authform__error">{props.errors.password}</span>
          </div>
          <div className="authform__submit">
            <span className="authform__submit-error">{errorMessage}</span>
            <button className="authform__submit-button" type="submit" onSubmit={handleSubmit} disabled={!props.isValid}>
            {props.isLoading ? "Загрузка" : "Войти"}
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
    </main>
  );
}

export default Login;
