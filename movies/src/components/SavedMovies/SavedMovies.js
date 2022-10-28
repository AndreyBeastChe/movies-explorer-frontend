import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies(props) {
  return (
    <>
      <SearchForm
        searchValueSavedMovie={props.searchValueSavedMovie}
        onSubmit={props.onSubmit}
        onChange={props.onChange}
        handleCheck={props.handleCheck}
        shortMovie={props.shortMovie}
      />
      <MoviesCardList
        shortMovie={props.shortMovieSavedMovie}
        loading={props.loading}
        searchErr={props.searchErr}
        deleteMovie={props.deleteMovie}
        savedMovies={props.savedMovies}
      />
    </>
  );
}

export default SavedMovies;
