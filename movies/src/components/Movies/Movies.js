import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies(props) {
  return (
    <main>
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
          saveMovie={props.saveMovie}
        />
      </>
    </main>
  );
}

export default Movies;
