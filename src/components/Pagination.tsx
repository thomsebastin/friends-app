import React from "react";

function Pagination({ friends, currentPage, setCurrentPage }: any) {
  const FRIENDS_PER_PAGE = 4;

  const handlePaginationClick = (e: any) => setCurrentPage(Number(e.target.id));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(friends.length / FRIENDS_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        className={`pagination__item ${currentPage === number ? "active" : ""}`}
        key={number}
        id={number.toString()}
        onClick={handlePaginationClick}
      >
        {currentPage === number ? <b>{number}</b> : number}
      </li>
    );
  });

  if (friends.length > 4) {
    return (
      <ul className="pagination" id="page-numbers">
        {renderPageNumbers}
      </ul>
    );
  } else {
    return null;
  }
}

export default Pagination;
