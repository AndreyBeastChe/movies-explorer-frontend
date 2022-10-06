import "./Promo.css";

import logo from "../../../images/promo-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo-container__titles">
          <h1 className="promo__title">
            Учебный проект студента факультета <br /> Веб-разработки.
          </h1>
          <h3 className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </h3>
          <div className="promo__button">Узнать больше</div>
        </div>
        <img className="promo__logo" src={logo} alt="Лого web"></img>
      </div>
    </section>
  );
}

export default Promo;
