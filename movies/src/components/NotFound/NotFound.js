import "./NotFound.css";
import { Link, useHistory } from "react-router-dom";

function NotFound() {

  const history = useHistory();

  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__return" onClick={history.goBack}>
        
        Назад
      </Link>
    </section>
  );
}

export default NotFound;