import React, { useState } from "react";
import "./App.scss";
import { useImmer } from "use-immer";

import { f as data } from "./utils/data";
import { findLargest } from "./utils/utils";

import Friends from "./components/Friends";
import Header from "./components/Header";
import SortByFavorite from "./components/SortByFavorite";
import Search from "./components/Search";
import Pagination from "./components/Pagination";

function App() {
  const f = data;
  const CURR_PAGE = 1;
  const [query, setQuery] = useState("");
  const [friends, setFriends] = useImmer(f);
  const [searchActive, setSearchActive] = useState(false);
  const [sortedByFav, setSortedByFav] = useState(false);
  const [currentPage, setCurrentPage] = useState(CURR_PAGE);

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: { key: string; target: { value: string } }) => {
    if (e.key === "Enter") {
      const newFriend = e.target.value.trim();
      const regex = /^[a-zA-Z ]{2,30}$/;

      if (regex.test(newFriend)) {
        /**
         * Adding a friend. Please note that we are not mutating state by pushing here
         * We are using immer which takes existing state as a draft object and returns
         * a new one.
         */
        setFriends((draft) => {
          draft.push({
            id: findLargest(friends) + 1,
            name: newFriend,
            isFavorite: false,
          });
        });
        setQuery("");
        setSearchActive(false);
      }
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setQuery("");
    setSearchActive(false);
    setFriends(f);
  };

  const handleSearchClick = () => {
    setSearchActive(true);
    setFriends(filterFriends());
  };

  const filterFriends = () => {
    return friends.filter((friend) => {
      if (!query || query === " ") return true;

      const fName = friend.name.toLowerCase();
      if (fName.includes(query.toLowerCase())) {
        return true;
      }
      return false;
    });
  };

  return (
    <div className="App">
      <Header />
      <SortByFavorite
        setFriends={setFriends}
        sortedByFav={sortedByFav}
        setSortedByFav={setSortedByFav}
      />
      <Search
        query={query}
        handleKeyDown={handleKeyDown}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleSearchClick={handleSearchClick}
        searchActive={searchActive}
        handleReset={handleReset}
      />
      <Friends
        friends={friends}
        currentPage={currentPage}
        setFriends={setFriends}
        setSortedByFav={setSortedByFav}
      />
      <Pagination
        friends={friends}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
