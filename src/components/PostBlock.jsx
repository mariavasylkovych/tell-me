// import axios from "axios";
import React from "react";
import "../scss/components/postBlock.scss";
// import "../scss/components/getPosts.scss";

import { Route, Link, NavLink } from "react-router-dom";
// import classNames from "classnames";
import { setAddData, setDataOfPost } from "../redux/action";
import { useDispatch } from "react-redux";
// import Comments from "./Comment";

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

const PostBlock = ({ id, title, body, userId, postId }) => {
  const [usersData, setUsersData] = React.useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getUserPost()
  }, []);

  const getUserPost = () => {
    fetch(`https://ekreative-json-server.herokuapp.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
        // console.log(data);
      });
  }
  return (
    <div className="post-block" id={`post-${id}`}>
        <div className="content">
          <Link to='/post' className="post-title" onClick={() => dispatch(setDataOfPost(id, title, body, userId))}>{title}</Link>
          <p className="post-user">
            {usersData.firstname} {usersData.lastname}
          </p>
        </div>
    </div>
  );
};

export default PostBlock;
