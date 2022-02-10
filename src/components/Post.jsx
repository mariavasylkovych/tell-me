import axios from "axios";
import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import '../scss/components/post.scss'
import '../scss/components/comments.scss'
import { Link } from "react-router-dom";

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

const Post = () => {
  const [usersData, setUsersData] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");

  let data = JSON.parse(localStorage.user);
  const dataPost = useSelector((state) => state.dataPostReducer);
  console.log(dataPost);

  React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/users/${dataPost.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      });
  }, []);
    
    

    function deletePost() {
        const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
      }
    axios.delete(`https://ekreative-json-server.herokuapp.com/664/post/${dataPost.id}`, {headers});
  }

  React.useEffect(() => {
    getDataComment();
  }, []);
  console.log(dataPost.postId);

  const getDataComment = () => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/comments?postId=${dataPost.postId}&_sort=createdAt&_order=asc`
    )
      .then((response) => response.json())
      .then((data) => {
        // setComments(data);
        console.log(data);
      });
  };

  const handleChangeUserComment = (e) => {
    e.preventDefault();
    setNewComment(e.target.value);
  };

  const addComment = (postId) => {
    const data = {
      postId,
      // userId: dataAboutUser.id,
      body: newComment,
      createdAt: datetime,
      updatedAt: "",
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };

    axios.post(
      `https://ekreative-json-server.herokuapp.com/664/comments`,
      data,
      headers
    );

    // updateDiv(postId)
  };

  return (
    <div className="post" id={`post-${dataPost.id}`}>
     <Link to='/' className="logo"><h2 className="logo">Tell <span>me</span></h2></Link>
      <div className="content-post">
        <div className="content">
          <h3 >{dataPost.title}</h3>
          <p className="post-body">{dataPost.body}</p>
          
        </div>
         <div className="bottom-content">
        <p className="post-user">{usersData.firstname} {usersData.lastname}</p>
        {localStorage.getItem("token") && usersData.id === data.id ? (
          <div className="content-button">
            <button
              className={classNames("button-post", "button")}
              onClick={() => {}}
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
          )}
          </div>
      </div>
      <div className="comments-of-post">
        <h3>comments</h3>
        {localStorage.getItem("token") ? (
          <div className="comment-input-block">
            <img src={data.avatar} alt="" />
            <input
              type="text"
              value={newComment}
              onChange={handleChangeUserComment}
            />
            <button onClick={() => addComment(dataPost.id)}>&#43;</button>
          </div>
        ) : (
          ""
        )}

        {comments.map((comment) => (
          <Comment {...comment} />
        ))}
      </div>
    </div>
  );
};

export default Post;
