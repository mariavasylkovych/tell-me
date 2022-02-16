import React from "react";

import "../scss/components/postBlock.scss";

import { Link } from "react-router-dom";
import { setComments, setDataOfPost } from "../redux/action";
import { useDispatch } from "react-redux";

const PostBlock = (dataPost) => {
  const [usersData, setUsersData] = React.useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/posts/${dataPost.id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setDataOfPost(data))
      })
  }, []);

  React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/users/${dataPost.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      });
  }, []);

  React.useEffect(() => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/comments?postId=${dataPost.id}&_sort=createdAt&_order=asc`
    )
      .then((response) => response.json())
      .then((data) => 
        dispatch( setComments(data) )
      );
  }, []);

  return (
    <div className="post-block" id={`post-${dataPost.id}`}>
        <div className="content">
          <Link to={`/post/${dataPost.id}`} className="post-title" onClick={() => dispatch(setDataOfPost(dataPost))} >{dataPost.title}</Link>
          <p className="post-user">
            {usersData.firstname} {usersData.lastname}
          </p>
        </div>
    </div>
)
};

export default PostBlock;
