import "./SearchForm.css";
import React, { useState } from "react";

function SearchForm(props) {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <section className="search">
      <form onSubmit={props.onSubmit} className="search__form" noValidate>
        <input
          className="search__input"
          required
          type="text"
          placeholder="Фильм"
          name="search-input"
          onChange={props.onChange}
        />
        <button className="search__button" type="submit" name="search-button">
          Поиск
        </button>
      </form>

      <div className="search__filter">
        <label className="search__switch">
          <input
            className="search__checkbox"
            type="checkbox"
            checked={isChecked}
            onClick={handleChange}
            onChange={props.handleCheck}
          />
          <span className="search__checkbox-slider search__checkbox-round"></span>
          <p className="search__checkbox-variant">Короткометражки</p>
        </label>
      </div>
    </section>
  );
}

export default SearchForm;
