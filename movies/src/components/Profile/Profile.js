import React from "react";
import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет Виталий</h2>

      <div className="profile__data">
        <p className="profile__firld">Имя </p>
        <p className="profile__value">Виталий</p>
      </div>

      <div className="profile__data">
        <p className="profile__firld">E-mail </p>
        <p className="profile__value">pochta@yandex.ru</p>
      </div>

      <div className="profile__button">
        <button className="profile__edit-button" type="button">Редактировать</button>
        <button className="profile__logout-button" type="button">Выйти из аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;
