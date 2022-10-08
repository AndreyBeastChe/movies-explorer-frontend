import './Portfolio.css';

function Portfolio() {
  return(
<section className="portfolio">
  <h2 className="portfolio__title">Портфолио</h2>
  <a className="portfolio__block" href="https://github.com/AndreyBeastChe/russian-travel" target="blank">
    <div className="portfolio__link" >Статичный сайт</div>
    <div className="portfolio__button">↗</div>
  </a>
  <a className="portfolio__block" href="https://github.com/AndreyBeastChe/mesto-react" target="blank">
    <div className="portfolio__link">Адаптивный сайт</div>
    <div className="portfolio__button">↗</div>
  </a>
  <a className="portfolio__block" href="https://github.com/AndreyBeastChe/react-mesto-api-full"
        target="blank">
    <div 
        className="portfolio__link"  
        
    >
        Одностраничное приложение
    </div>
    <div className="portfolio__button">↗</div>
  </a>
</section>
  );
}

export default Portfolio;