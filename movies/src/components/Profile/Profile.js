import React from "react";
import "./Profile.css";
import Popup from "../Popup/Popup";
import { CurrentUserContext } from "../..//context/CurrentUserContext";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [edit, setEdit] = React.useState(false);
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [disabledButton, setDisabledButton] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [updatePopupOpen, setUpdatePopupOpen] = React.useState(false);

  function handleChange(e) {
    const value = e.target.value;
    e.target.name === "name" ? setName(value) : setEmail(value);
    props.handleChange(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name: name, email: email };
    props.onSubmit(data, setEdit, setUpdatePopupOpen(true));
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

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    validationSameValue();
  }, [edit]);

  React.useEffect(() => {
    validationSameValue();
  }, [name, email]);

  function validationSameValue() {
    //console.log(name)
    //console.log(email)
    if (name === currentUser.name && email === currentUser.email) {
      setDisabledButton(true);
    } else {
      !props.isValid ? setDisabledButton(true) : setDisabledButton(false);
    }
  }

  const closeAllPopups = () => {
    setPopupOpen(false);
    setUpdatePopupOpen(false);
  };

  const updated = (e) => {
    e.preventDefault();
    setUpdatePopupOpen(false);
  };

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
            value={name}
            onChange={handleChange}
            disabled={!edit}
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
            value={email}
            onChange={handleChange}
            disabled={!edit}
            pattern="^[^ ]+@[^ ]+\.[a-z]{2,3}$"
          ></input>
          <span className="profile__error">{props.errors.email}</span>
          <span className="submit__error">{errorMessage}</span>
        </div>

        {edit ? (
          <button
            className="profile__button profile__button__submit"
            type="submit"
            disabled={disabledButton}
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
              onClick={setPopupOpen}
            >
              Выйти из аккаунта
            </button>
          </div>
        )}
      </form>
      <Popup
        isOpen={popupOpen}
        onClose={closeAllPopups}
        onSubmit={props.signOut}
        title="Вы уверены?"
        buttonName="Да, выйти"
      />

      <Popup
        isOpen={updatePopupOpen}
        onClose={closeAllPopups}
        onSubmit={updated}
        title="Профиль изменен!"
        buttonName="Ок!"
      />
    </section>
  );
}

export default Profile;
