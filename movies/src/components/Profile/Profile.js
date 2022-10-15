import React from "react";
import "./Profile.css";
import { CurrentUserContext } from "../..//context/CurrentUserContext";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [edit, setEdit] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(props.values, setEdit);
  };

  const enableEditProfile = () => {
    setEdit(true);
  };

  const errorStatus = (status) => {
    if (status === "400") {
      return "Не получилось обновить профиль";
    }
    if (status === "500") {
      return "На сервере произошла ошибка.";
    }
  };

  const errorMessage = errorStatus(props.submitErr);

  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>

      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__data">
          <p className="profile__firld">Имя </p>
          <input
            className="profile__value"
            required
            minLength="2"
            type="text"
            name="name"
            id="name"
            placeholder={currentUser.name}
            onChange={props.handleChange}
            disabled={!edit}
            value={props.values.username}
          ></input>
          <span className="profile__error">{props.errors.name}</span>
        </div>

        <div className="profile__data">
          <p className="profile__firld">E-mail </p>
          <input
            className="profile__value"
            required
            minLength="2"
            type="text"
            name="email"
            id="email"
            placeholder={currentUser.email}
            onChange={props.handleChange}
            disabled={!edit}
            value={props.values.email}
          ></input>
          <span className="profile__error">{props.errors.email}</span>
          <span className="submit__error">{errorMessage}</span>
        </div>

        {edit ? (
          <button
            className="profile__button profile__button__submit"
            type="submit"
            disabled={!props.isValid}
          >
            {props.isLoading ? "Сохранение" : "Сохранить"}
          </button>
        ) : (
          <div className="profile__button">
            <button
              className="profile__edit-button"
              type="button"
              onClick={enableEditProfile}
            >
              Редактировать
            </button>
            <button
              className="profile__logout-button"
              type="button"
              onClick={props.signOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

export default Profile;
