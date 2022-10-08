import "./MoviesCard.css";
import React from 'react';


function MoviesCard({ movie, isSavedMovie }) {

     const [isLiked, setIsLiked] = React.useState(false);
     const isDeleteButtonVisible = true;


    const handleLike = () => {
        isLiked ? setIsLiked(false) : setIsLiked(true);
    }

    const handleDelete = () => {
    }

    const likeButtonClassName = `movie__like-button ${isLiked ? "movie__like-button_active" : ""}`;
    const deleteButtonClassName = `movie__delete-button ${isDeleteButtonVisible ? "movie__delete-button_active" : ""}`;


    return (
        <li className="movie">
            <img className="movie__image" alt="Стопкадр к фильму"  src={movie.image}></img>
            <div className="movie__container">
            <div className="movie__data">
                <h2 className="movie__title">33 слова о дизайне</h2>
                <span className="movie__duration">
            1 час 10 минут
            </span>
                </div>
                {
                    isSavedMovie ? 
                        <button className={deleteButtonClassName} onClick={handleDelete} type="button"></button> :
                        <button className={likeButtonClassName} onClick={handleLike} type="button"></button>
                }
           
            </div>
        </li>
    );
}

export default MoviesCard;