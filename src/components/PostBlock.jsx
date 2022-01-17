import axios from "axios";
import React from "react";
import "../scss/components/postBlock.scss";
// import "../scss/components/getPosts.scss";

// import { Route, Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import { setAddData } from "../redux/action";
import { useDispatch } from "react-redux";
import Comments from "./Comments";

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



const PostBlock = ({ id, title, body, userId, createdAt }) => {
  const [usersData, setUsersData] = React.useState([]);

  // let data = JSON.parse(localStorage.user);

  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
        // console.log(data);
      });
  }, []);


  

  function deletePost() {
    axios.delete(`https://ekreative-json-server.herokuapp.com/664/post/${id}`);
  }

  const editPost = (id, title, body, userId, createdAt) => {
    dispatch(setAddData(id, title, body, userId, createdAt));
  };

  return (
    <div className="post-block" id={`post-${id}`}>
      <div className="content-post">
        <div className="content">
          <h3>{title}</h3>
          <p>{body}</p>
          <p>
            {usersData.firstname} {usersData.lastname}
          </p>
        </div>
        {/* {localStorage.getItem("token") && usersData.id === data.id ? (
          <div className="content-button">
            <button
              className={classNames("button-post", "button")}
              onClick={() => editPost(id, title, body, userId, createdAt)}
            >
              Edit
            </button>
            <button
              className={classNames("button-post", "button")}
              onClick={deletePost}
            >
              Delete
            </button>
          </div>
        ) : (
          ""
        )} */}
      </div>
      <Comments postId={id} />
    </div>
  );
};

export default PostBlock;
