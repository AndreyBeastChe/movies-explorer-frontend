import './Portfolio.css';

function Portfolio() {
  return(
<section className="portfolio">
  <h2 className="portfolio__title">Портфолио</h2>
  <div className="portfolio__block">
    <a className="portfolio__link" href="https://github.com/AndreyBeastChe/russian-travel">Статичный сайт</a>
    <div className="portfolio__button">↗</div>
  </div>
  <div className="portfolio__block">
    <a className="portfolio__link" href="https://github.com/AndreyBeastChe/mesto-react">Адаптивный сайт</a>
    <div className="portfolio__button">↗</div>
  </div>
  <div className="portfolio__block">
    <a 
        className="portfolio__link"  
        href="https://github.com/AndreyBeastChe/react-mesto-api-full"
    >
        Одностраничное приложение
    </a>
    <div className="portfolio__button">↗</div>
  </div>
</section>
  );
}

export default Portfolio;