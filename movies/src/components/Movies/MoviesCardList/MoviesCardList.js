import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import MoreResuls from "../MoreResuls/MoreResuls";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {
  const DURATION_SHORT_MOVIE = 40;
  const WIDE_WIDTH = 5000;
  const MEDIUM_WIDTH = 768;
  const NARROW_WIDTH = 480;
  const TWELVE_ELEMENTS = 12;
  const EIGHT_ELEMENTS = 8;
  const FIVE_ELEMENTS = 5;
  const MORE_THREE_ELEMENTS = 3;
  const MORE_TWO_ELEMENTS = 2;

  const [visible, setVisible] = React.useState(TWELVE_ELEMENTS);
  const [items, setItems] = React.useState([]);

  const [showMore, setShowMore] = React.useState(MORE_THREE_ELEMENTS);

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

    if (dimensions.width <= WIDE_WIDTH) {
      setVisible(TWELVE_ELEMENTS);
      setShowMore(MORE_THREE_ELEMENTS);
    }

    if (dimensions.width <= MEDIUM_WIDTH && dimensions.width > NARROW_WIDTH) {
      setVisible(EIGHT_ELEMENTS);
      setShowMore(MORE_TWO_ELEMENTS);
    }

    if (dimensions.width <= NARROW_WIDTH) {
      setVisible(FIVE_ELEMENTS);
      setShowMore(MORE_TWO_ELEMENTS);
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
