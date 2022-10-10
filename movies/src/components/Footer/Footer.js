import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__name">&copy; 2022 Андрей Чечеткин</p>
        <ul className="footer__links-block">
          <li className="footer__link" href="https://practicum.yandex.ru">
            Яндекс.Практикум
          </li>
          <li className="footer__link" href="https://github.com/AndreyBeastChe">
            Github
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
