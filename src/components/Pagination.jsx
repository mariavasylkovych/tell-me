// import classNames from 'classnames'
import React from "react";
import { useDispatch } from "react-redux";
import { setGetPostsPage } from "../redux/action";
import "../scss/components/pagination.scss";

const Pagination = ({
  currentPage,
  postsPerPage,
  totalPosts,
  setCurrentPage,
}) => {
  const paginPageWithPosts = [];
  const response = [];

  const dispatch = useDispatch();

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    paginPageWithPosts.push(i);
  }

  const pagFunc = (response, number) => {
    setCurrentPage(number);

    //   dispatch(setGetPostsPage(response));
      
      fetch(
      `https://ekreative-json-server.herokuapp.com/posts?_page=${currentPage}&_limit=${postsPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setGetPostsPage(data));
      });
  };

  

  return (
    <div className="pagination">
      {paginPageWithPosts.map((number, index) => (
        <button
          id={`${index + 1}`}
          key={number}
          onClick={() => pagFunc(response, number)}
          className={index + 1 === currentPage ? "active" : "button-pag"}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
