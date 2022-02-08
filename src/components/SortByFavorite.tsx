import React from "react";

function SortByFavorite({ setFriends, sortedByFav, setSortedByFav }: any) {
  const handleSort = () => {
    if (!sortedByFav) {
      setFriends((draft: any[]) => {
        draft.sort((a, b) => a.isFavorite - b.isFavorite).reverse();
      });
      setSortedByFav(true);
    }
  };

  return <button className="sort-btn" onClick={handleSort}>Sort by favorite</button>;
}

export default SortByFavorite;
