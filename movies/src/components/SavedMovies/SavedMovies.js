import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies(props) {
  return (
    <>
      <SearchForm
        searchValue={props.searchValue}
        onSubmit={props.onSubmit}
        onChange={props.onChange}
        handleCheck={props.handleCheck}
      />
      <MoviesCardList
        movies={props.movies}
        shortMovie={props.shortMovie}
        loading={props.loading}
        searchErr={props.searchErr}
        deleteMovie={props.deleteMovie}
        savedMovies={props.savedMovies}
      />
    </>
  );
}

export default SavedMovies;
