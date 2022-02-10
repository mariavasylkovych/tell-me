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


  const dispatch = useDispatch();

  


  

  

  return (
    <div className="post-block" id={`post-${id}`}>
      <div className="content-post">
        <div className="content">
          <h3>{title}</h3>
          
          <p className="post-user">
            {usersData.firstname} {usersData.lastname}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostBlock;
