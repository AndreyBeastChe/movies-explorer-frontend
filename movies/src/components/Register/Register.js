import "./Register.css";
import { Link } from "react-router-dom";



function Register(props) {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.Reg(props.values);
}

const errorStatus = (status) => {
  if(status === '409') {
    return "Такой пользователь уже существует."
}

    if(status === '400') {
        return "Произошла ошибка."
    }
    if(status === '500') {
        return "На сервере произошла ошибка."
    }

}
const errorMessage = errorStatus(props.submitErr)

  return (
    <main>
    <section className="register">
      <form className="authform" noValidate onSubmit={handleSubmit}>
        <div className="authform__fields">
          <Link className="authform__logo" to="/"></Link>
          <h2 className="authform__title">Добро пожаловать!</h2>
          <label className="authform__label">Имя</label>
          <input
            required
            type="text"
            minLength="2"
            value={props.values.username}
            name="name"
            className="authform__input"
            onChange={props.handleChange}
          ></input>
          <span className="authform__error"></span>

          <label className="authform__label">E-mail</label>
          <input
            required
            type="email"
            className="authform__input"
            name="email"
            value={props.values.email}
            onChange={props.handleChange}
            pattern='^[^ ]+@[^ ]+\.[a-z]{2,3}$'
          ></input>
          <span className="authform__error">{props.errors.email}</span>

          <label className="authform__label">Пароль</label>
          <input
            required
            type="password"
            minLength="8"
            value={props.values.password}
            name="password"
            className="authform__input"
            onChange={props.handleChange}
          ></input>
          <span className="authform__error">{props.errors.password}</span>
        </div>
        <div className="authform__submit">
          <span className="authform__submit-error">{errorMessage}</span>
          <button className="authform__submit-button" type="submit" onSubmit={handleSubmit} disabled={!props.isValid}>
          {props.loading ? "Загрузка" : "Зарегистрироваться"}
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
