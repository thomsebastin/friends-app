import React from "react";

import { friend } from "../interfaces/interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

function Friends({ friends, currentPage, setFriends, setSortedByFav }: {
  friends: friend[],
  currentPage: number,
  setFriends: any,
  setSortedByFav: any
}) {
  const FRIENDS_PER_PAGE = 4;

  // Logic for displaying friends
  const indexOfLastFriend = currentPage * FRIENDS_PER_PAGE;
  const indexOfFirstFriend = indexOfLastFriend - FRIENDS_PER_PAGE;
  const currentFriends = friends.slice(indexOfFirstFriend, indexOfLastFriend);

  const endFriendship = (id: number) => {
    setFriends((draft: friend[]) => {
      return draft.filter((friend) => friend.id !== id);
    });
  };

  const toggleFavorite = (id: number) => {
    setFriends((draft: friend[]) => {
      const k = draft.find((friend) => friend.id === id);
      if (k)
        k.isFavorite = !k.isFavorite;
    });
    setSortedByFav(false);
  };

  const EmptyResults = () => {
    return <p>No friends found!! Don't worry, we still love you!!</p>;
  };

  const Friend = ({ currentFriends } : any) => {
    return currentFriends.map((friend: friend) => (
      <li className="friend__name" key={friend.id}>
        {friend.name}
        <span className="friend__name--description">is your friend</span>
        <button
          className="friend__name--favorite"
          onClick={() => toggleFavorite(friend.id)}
        >
          <FontAwesomeIcon icon={friend.isFavorite ? faStar : faStarRegular} />
        </button>
        <button
          className="friend__name--delete"
          onClick={() => endFriendship(friend.id)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </li>
    ));
  };

  return (
    <ul className="friends">
      {currentFriends.length > 0 ? (
        <Friend currentFriends={currentFriends} />
      ) : (
        <EmptyResults />
      )}
    </ul>
  );
}

export default Friends;
