import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import MoreResuls from "../MoreResuls/MoreResuls";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {
  const DURATION_SHORT_MOVIE = 40;
  const [visible, setVisible] = React.useState(12);
  const [items, setItems] = React.useState([]);

  const [showMore, setShowMore] = React.useState(3);

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  function debounce(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

  React.useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  React.useEffect(() => {
    props.movies && setItems(props.movies);

    if (dimensions.width <= 5000) {
      setVisible(12);
      setShowMore(3);
    }

    if (dimensions.width <= 768 && dimensions.width > 480) {
      setVisible(8);
      setShowMore(2);
    }

    if (dimensions.width <= 480) {
      setVisible(5);
      setShowMore(2);
    }
  }, [props.movies, dimensions.width]);

  function filterShortMovie(movie) {
    return movie.filter((m) => m.duration <= DURATION_SHORT_MOVIE);
  }

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + showMore);
  };

  return (
    <section className="movies">
      {props.loading && <Preloader />}
      {props.searchError !== "" && (
        <span className="movies__error">{props.searchErr}</span>
      )}
      {props.savedMovies?.length === 0 && (
        <span className="movies__error">Нет сохраненных фильмов</span>
      )}
      <ul className="movies__list">
        {props.movies &&
          (props.shortMovie ? filterShortMovie(items) : items)
            .slice(0, visible)
            .map((data) => {
              return (
                <MoviesCard
                  saveMovie={props.saveMovie}
                  isSavedMovie={true}
                  movie={data}
                  key={data.id}
                />
              );
            })}
        {props.savedMovies &&
          (props.isShortMovie
            ? filterShortMovie(props.savedMovies)
            : props.savedMovies
          ).map((data) => {
            return (
              <MoviesCard
              isSavedMovie={false}
                isInSavedList={props.isInSavedList}
                key={data._id}
                savedMovie={data}
                deleteMovie={props.deleteMovie}
              />
            );
          })}
      </ul>
      {props.movies && items.length > visible && (
        <MoreResuls showMoreClick={showMoreItems} />
      )}
    </section>
  );
}

export default MoviesCardList;
