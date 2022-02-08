import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

function Search({
  query,
  handleInputChange,
  handleKeyDown,
  handleSubmit,
  handleSearchClick,
  searchActive,
  handleReset,
}: any) {
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <label htmlFor="header-search">
        <span className="visually-hidden">Search blog posts</span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder="Enter your friend's name"
        name="s"
        value={query}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      />
      <span
        onClick={searchActive ? handleReset : handleSearchClick}
        className="search-form__icon"
      >
        <FontAwesomeIcon icon={searchActive ? faTimes : faSearch} />
      </span>
    </form>
  );
}

export default Search;
