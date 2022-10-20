import "./MoviesCard.css";
import React from "react";

function MoviesCard(props) {
  // const REG = /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:?#[\]@!$&'()*+,;=]+)/;
  // console.log (props.movie.trailerLink)

  // console.log (props.movie.trailerLink.match(REG))
  const [isLiked, setIsLiked] = React.useState(false);
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] =
    React.useState(false);
  const likeButtonClassName = `movie__like-button ${
    isLiked ? "movie__like-button_active" : ""
  }`;
  const deleteButtonClassName = `movie__delete-button ${
    isDeleteButtonVisible ? "movie__delete-button_active" : ""
  }`;
  const IMG_URL = "https://api.nomoreparties.co/";
  const savedMoviesStorage = JSON.parse(localStorage.getItem("savedMovies"));


  function handleCardMouseOver() {
    setIsDeleteButtonVisible(true);
  }

  function handleCardMouseOut() {
    setIsDeleteButtonVisible(false);
  }

  const handleLike = () => {
    props.saveMovie(props.movie, isLiked, setIsLiked);
  };

  const handleDelete = () => {
    props.deleteMovie(props.savedMovie);
  };

  const adoptDuration = (min) => {
    return `${Math.floor(min / 60) % 24} ч ${min % 60} минут`;
  };

  React.useEffect(() => {
    if (props.movie) {
        savedMoviesStorage?.some((i) => i.movieId === props.movie.id)
        ? setIsLiked(true)
        : setIsLiked(false);
    }
  }, [props.movie, savedMoviesStorage]);

  return (
    <li className="movie">
      <a
        href={
          props.movie
            ? `${props.movie.trailerLink}`
            : `${props.savedMovie.trailer}`
        }
      >
        <img
          className="movie__image"
          alt={
            props.movie
              ? `Превью  ${props.movie.title}`
              : `Превью  ${props.savedMovie.title}`
          }
          src={
            props.movie
              ? `${IMG_URL}${props.movie.image?.url}`
              : `${props.savedMovie.image}`
          }
        />
      </a>
      <div
        className="movie__container"
        onMouseEnter={handleCardMouseOver}
        onMouseLeave={handleCardMouseOut}
      >
        <div className="movie__data">
          <h2 className="movie__title">
            {props.movie ? props.movie.nameRU : props.savedMovie.nameRU}
          </h2>
          <span className="movie__duration">
            {props.movie
              ? adoptDuration(props.movie.duration)
              : adoptDuration(props.savedMovie.duration)}
          </span>
        </div>
        {props.isSavedMovie ? (
          <button
            className={likeButtonClassName}
            onClick={handleLike}
            type="button"
          ></button>
        ) : (
          <button
            className={deleteButtonClassName}
            onClick={handleDelete}
            type="button"
          ></button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
