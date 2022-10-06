import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies, isSavedMovie }) {
  return (
    <section className="movies">
      <ul className="movies__list">
        {movies.map((data) => (
          <MoviesCard key={data._id} movie={data} isSavedMovie={isSavedMovie} />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
