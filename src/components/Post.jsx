import axios from "axios";
import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import "../scss/components/post.scss";
import "../scss/components/comments.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDataOfPost, setPosts } from "../redux/action";

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
  const [updPost, setUpdPost] = React.useState({
    body: "",
    title: "",
    openEdit: false,
    response: {}
  });

  let data = JSON.parse(localStorage.user);
  const dataPost = useSelector((state) => state.dataPostReducer);
  const dispatch = useDispatch()

  React.useEffect(() => {
    getDataUser()
  }, []);

  const getDataUser = () => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/users/${dataPost.userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      });
  }

  const deletePost = (id) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };
    axios.delete(
      `https://ekreative-json-server.herokuapp.com/664/posts/${id}`,
      { headers }
    );

  };

  React.useEffect(() => {
    getDataComment();
  }, []);

  const getDataComment = () => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/comments?postId=${dataPost.id}&_sort=createdAt&_order=asc`
    )
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  };

  const openEditPost = (body, title) => {
    setUpdPost({
      body,
      title,
      openEdit: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updatePost = async (title, body, id) => {

    const data = {
      title,
      body,
      updateAt: datetime,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };

    await axios.patch(
      `https://ekreative-json-server.herokuapp.com/664/posts/${id}`,
      data,
      { headers }
    )

    await axios.get(`https://ekreative-json-server.herokuapp.com/664/posts/${id}`)
      .then(response => dispatch(setDataOfPost(response.data.id, response.data.body, response.data.title, response.data.userId)));
    
    await axios.get('https://ekreative-json-server.herokuapp.com/posts')
    .then(response => dispatch(setPosts(response.data)))
    
    setUpdPost((prevState) => ({
      ...prevState,
      openEdit: false
    }))

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
      <Link to="/" className="logo">
        <h2 className="logo">
          Tell <span>me</span>
        </h2>
      </Link>
      {updPost.openEdit ? (
        <div className="content-post-edit">
          <input
            className="input-title"
            value={updPost.title}
            onChange={handleChange}
            name="title"
            type="text"
          />
          <textarea
            className="input-body"
            value={updPost.body}
            onChange={handleChange}
            name="body"
          />
          <button
            className={classNames("button-post", "button")}
            onClick={() => updatePost(updPost.title, updPost.body, dataPost.id)}
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="content-post">
          <div className="">
            <div className="content">
              <h3>{dataPost.title}</h3>
              <p className="post-body">{dataPost.body}</p>
            </div>
            <div className="bottom-content">
              <p className="post-user">
                {usersData.firstname} {usersData.lastname}
              </p>
              {localStorage.getItem("token") && usersData.id === data.id ? (
                <div className="content-button">
                  <button
                    className={classNames("button-post", "button")}
                    onClick={() => openEditPost(dataPost.body, dataPost.title)}
                  >
                    Edit
                  </button>
                    <Link
                      to={'/'}
                    className={classNames("button-post", "button")}
                    onClick={() => deletePost(dataPost.id)}
                  >
                    Delete
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="comments-of-post">
            <h3>comments</h3>
            {comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
