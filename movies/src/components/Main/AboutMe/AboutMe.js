import "./AboutMe.css";
import photo from "../../../images/photo.png"; 

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__block">
      <div className="about-me__container">
          <h3 className="about-me__name">Андрей</h3>
          <h4 className="about-me__job">
            Фронтенд-разработчик, 28 лет
          </h4>
          <p className="about-me__text">
            Я родился в Подольске и живу в Москве, закончил МЭИ.
            Я люблю  путешевствия
            Послендие 6 лет работаю QA и решил попробовать себя в веб разработке.
          </p>
          <ul className="about-me__links">
            <li className="about-me__link-item">
              <a href="https://github.com/AndreyBeastChe/" className="about-me__link">Github</a>
            </li>
          </ul>
          </div>
          <img className="about-me__photo" alt="Фотография" src={photo}></img> 
      </div>
    </section>
  );
}

export default AboutMe;