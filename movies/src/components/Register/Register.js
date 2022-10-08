import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <main>
    <section className="register">
      <form className="authform" noValidate>
        <div className="authform__fields">
          <Link className="authform__logo" to="/"></Link>
          <h2 className="authform__title">Добро пожаловать!</h2>
          <label className="authform__label">Имя</label>
          <input
            required
            type="text"
            minLength="2"
            value="Виталий|"
            name="name"
            className="authform__input"
          ></input>
          <span className="authform__error"></span>

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
            value="12345678"
            name="password"
            className="authform__input"
          ></input>
          <span className="authform__error">"Что-то пошло не так..."</span>
        </div>
        <div className="authform__submit">
          <span className="authform__submit-error"></span>
          <button className="authform__submit-button" type="submit">
            Зарегистрироваться
          </button>
          <div className="authform__link">
            <span className="authform__span">Уже зарегистрированы?</span>
            <Link to="/signin" className="authform__link-button">
              Войти
            </Link>
          </div>
        </div>
      </form>
    </section>
    </main>
  );
}

export default Register;
