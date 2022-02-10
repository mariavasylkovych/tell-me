import classNames from "classnames";
import React from "react";

const Post = () => {
  const [usersData, setUsersData] = React.useState([]);

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
          <p className="post-body">{body}</p>
          <p className="post-user">
            {usersData.firstname} {usersData.lastname}
          </p>
        </div>
        {localStorage.getItem("token") && usersData.id === data.id ? (
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
        )}
      </div>
      <Comments postId={id} />
    </div>
  );
};

export default Post;
