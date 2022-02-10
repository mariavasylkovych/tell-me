import axios from "axios";
import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import "../scss/components/comments.scss";

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

const Comment = ({ id, body, userId }) => {
  const [usersData, setUsersData] = React.useState([]);
  const [updateCommentBody, setUpdateCommentBody] = React.useState({
    value: "",
    openUptComm: false,
    id: "",
  });

  let dataAboutUser = JSON.parse(localStorage.user);

  React.useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = () => {
    fetch(`https://ekreative-json-server.herokuapp.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      });
  };

  const handleChange = (e) => {
    setUpdateCommentBody((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));
  };

  const openUpdateBlock = (id, body) => {
    setUpdateCommentBody((prevState) => ({
      ...prevState,
      value: body,
      openUptComm: true,
      id,
    }));
  };

  const updateComment = ({ id }, updateBody) => {
    const data = {
      body: updateBody,
      updatedAt: datetime,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };
    axios.patch(
      `https://ekreative-json-server.herokuapp.com/664/comments/${id}`,
      data,
      headers
    );

    setUpdateCommentBody((prevState) => ({
      ...prevState,
      openUptComm: false,
    }));
  };

  const deleteComment = (id, postId) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };
    axios.delete(
      `https://ekreative-json-server.herokuapp.com/664/comments/${id}`,
      { headers }
    );
    console.log(`Bearer` + localStorage.getItem("token"));
    document.location.reload(true);
  };

  return (
    <div key={id} className="comment-data">
      {updateCommentBody.openUptComm && id === updateCommentBody.id ? (
        <div className="comment-content-for-update">
          <input
            type="text"
            value={updateCommentBody.value}
            onChange={handleChange}
          />
          <button onClick={() => updateComment(id, updateCommentBody.value)}>
            Update
          </button>
        </div>
      ) : (
            <div key={id + 3 + "li"} className="comment-content">
              <img className="user-avatar" src={usersData.avatar} alt="" />
            <p>{body}</p>
            {localStorage.getItem("token") && dataAboutUser.id === userId ? (
              <div key={id + 1} className="button-block">
                <button onClick={() => openUpdateBlock(id, body)}>
                  Update
                </button>
                <button key={id + 2} onClick={() => deleteComment(id)}>
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
      )}
    </div>
  );
};

export default Comment;
