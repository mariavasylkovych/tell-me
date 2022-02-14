// import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostBlock, Pagination } from "./index";
import "../scss/components/getPosts.scss";
import Announcement from "./Announcement";
import { Link } from "react-router-dom";
import "../scss/components/announcement.scss";
import { setPosts } from "../redux/action";

var currentdate = new Date();

var datetime =
  currentdate.getFullYear() +
  "-" +
  currentdate.getMonth() +
  "-" +
  currentdate.getDay() +
  "T" +
  currentdate.getHours() +
  ":" +
  currentdate.getMinutes() +
  ":" +
  currentdate.getSeconds();

const GetPosts = () => {
  // const [posts, setPosts] = React.useState([]);
  const [announcements, setAnnouncements] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(10);

  const postsPages = useSelector((state) => state.paginateReducer);
  // console.log(postsPages);

  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  console.log(posts);

  React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/664/posts`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPosts(data))
      });
  }, []);

  React.useEffect(() => {
    getDataAnnoun();
  }, []);

  const getDataAnnoun = () => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/664/announcements?_sort=createdAt&_order=desc&_limit=10`
    )
      .then((response) => response.json())
      .then((data) => setAnnouncements(data));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="get-posts" id="posts">
        <h3 className="header-posts">all posts</h3>
      <div className="posts-block">
        {postsPages.map((dataPost) => (
          <PostBlock key={dataPost.id} {...dataPost} />
        ))}
      </div>
      <Pagination  postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
      <div className="announcements-home">
        <h3 className="header-announs">announcements</h3>
        <div className="announcements">
          {announcements.map((announ) => (
          <Announcement key={announ.id} {...announ} />
        ))}
        </div>
        {localStorage.getItem("token") ? (
          <div className="block-button-announ">
            <Link to="/create-announ" className="button-add-announ">
              Add new announcement
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default GetPosts;
