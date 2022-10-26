import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import MoreResuls from "../MoreResuls/MoreResuls";
import Preloader from "../Preloader/Preloader";
import {
  DURATION_SHORT_MOVIE,
  WIDE_WIDTH,
  MEDIUM_WIDTH,
  NARROW_WIDTH,
  TWELVE_ELEMENTS,
  EIGHT_ELEMENTS,
  FIVE_ELEMENTS,
  MORE_THREE_ELEMENTS,
  MORE_TWO_ELEMENTS,
  MORE_ONE_ELEMENTS,
} from "../../../utils/consts";

function MoviesCardList(props) {
  const [visible, setVisible] = React.useState(TWELVE_ELEMENTS);
  const [items, setItems] = React.useState([]);

  const [showMore, setShowMore] = React.useState(MORE_THREE_ELEMENTS);

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  function filterShortMovie(movie) {
    debugger
    return movie.filter((m) => m.duration <= DURATION_SHORT_MOVIE);
  }

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
      setShowMore(MORE_ONE_ELEMENTS);
    }
  }, [props.movies, dimensions.width]);


  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + showMore);
  };

  return (
    <section className="movies">
      {props.loading && <Preloader />}

      {props.searchErr !== "" ? (
        <span className="movies__error">{props.searchErr}</span>
      ) : (
        <ul className="movies__list">
          {props.movies &&
            (props.shortMovie ? filterShortMovie(items) : items)
              .slice(0, visible)
              .map((data) => {
                return (
                  <MoviesCard
                    //saveMovie={props.savedMovie}
                    isSavedMovie={true}
                    movie={data}
                    key={data.id}
                    addsaveMovie={props.addsaveMovie}
                  />
                );
              })}
          {props.savedMovies &&
            (props.shortMovie
               ? filterShortMovie(props.savedMovies)
               : props.savedMovies
            ).map((data) => {
               return (
                <MoviesCard
                  isSavedMovie={false}
                  key={data._id}
                  savedMovie={data}
                  deleteMovie={props.deleteMovie}
                />
              );
            })}
        </ul>
      )}
      {props.movies && items.length > visible && (
        <MoreResuls showMoreClick={showMoreItems} />
      )}
    </section>
  );
}

export default MoviesCardList;
