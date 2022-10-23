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


  function handleChange(e) {
    const value = e.target.value;
      e.target.name === "name" ? setName(value) : setEmail(value);
      props.handleChange(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(props.values, setEdit, setPopupOpen);
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
    if (edit) {
      setName(props.values.name);
      setEmail(props.values.email);
    } else {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [edit]);
  

  React.useEffect(() => {
    validationSameValue()
  }, [name, email]);


  function validationSameValue() {
    if ((name === currentUser.name) || (email === currentUser.email) ){
      setDisabledButton(true)
    }
    else {
      !props.isValid ?
      (setDisabledButton(true))
    :
      (setDisabledButton(false))
    }
  }

  const closePopup = () => {
    setPopupOpen(false);
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
                    onClose={closePopup}
                    onSubmit={props.signOut}
                    title="Вы уверены?"
                    buttonName="Да, выйти"
                />
    </section>
  );
}

export default Profile;
