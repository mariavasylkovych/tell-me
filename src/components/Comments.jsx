import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import '../scss/components/comments.scss'

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

const Comments = ({ postId }) => {
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");
  const [dataComment, setDataComment] = React.useState({
    commentId: '',
    userId:''
  });
  const [dataUserComment, setDataUserComment] = React.useState([]);
  const [updateCommentBody, setUpdateCommentBody] = React.useState({
    value: "",
    openUptComm: false,
    id: ''
  });
  // console.log(dataComment);

    let dataAboutUser = JSON.parse(localStorage.user);

  React.useEffect(() => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/comments?postId=${postId}&_sort=createdAt&_order=asc`
    )
      .then((response) => response.json())
      .then((data) => {
        setComments(data);

        // data.map((comment) =>
        //   setDataComment( comment.userId )
        // );
      });
  }, []);

  React.useEffect(() => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/comments/${dataComment.commentId}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        setDataComment(prevState => ({
          ...prevState,
          userId: data.userId
          }))
      });
  }, []);

  const handleChangeUserComment = (e) => {
    setNewComment(e.target.value);
  };

  const handleChange = (e) => {
    setUpdateCommentBody((prevState) => ({ ...prevState, value: e.target.value }));
  };

  const openUpdateBlock = (id, body) => {
    setUpdateCommentBody((prevState) => ({
      ...prevState,
      value: body,
      openUptComm: true,
      id
    }));
  };

  const updateComment = ({ id, postId }, updateBody) => {
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
      { headers }
    );

    setUpdateCommentBody((prevState) => ({
      ...prevState,
      openUptComm: false,
    }));

    // window.location.reload()
    updateDiv(postId)
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
      { headers }
    );
    document.location.reload(true)
    
    window.location.reload()
    updateDiv(postId)
  };

  const deleteComment = (id, postId) => {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };
    axios.delete(
      `https://ekreative-json-server.herokuapp.com/664/comments/${id}`,
      { headers }
    );
      console.log(`Bearer` + localStorage.getItem("token"));
    document.location.reload(true)
    
    // window.location.reload()
    // updateDiv(postId)
  };

    //  console.log('dataComment',dataComment);
  
  React.useEffect(() => {
    userData();
    return () => {
      setDataUserComment([]); // This worked for me
    };
  }, []);
  
  const userData = () => {
    let headers = {
      "mode": "no-cors",
    }
  
    fetch(`https://ekreative-json-server.herokuapp.com/users${dataComment.userId}`, { headers })
      .then((response) => response.json())
      .then((data) => {
        // setDataUserComment([data]);
        // console.log('data',data);
      });
  }

const updateDiv = (postId) =>
{ 
    // document.getElementById( 'posts' ).onload(window.location.href + `#post-${postId}` );
}

  
  return (
    <div className="comments-of-post">
      <h3>comments</h3>
      {localStorage.getItem("token") ? (
        <div className="comment-input-block">
          <img
            src={dataAboutUser.avatar}
            alt=""
          />
          <input type="text" value={newComment} onChange={handleChangeUserComment} />
         <Link to='#post'><button onClick={() => addComment(postId)}>&#43;</button></Link>
        </div>
      ) : (
        ""
      )}

      {comments.map((comment) => (
            <div key={comment.id} className="comment-data">
              {updateCommentBody.openUptComm && comment.id === updateCommentBody.id ? (
                <div className="comment-content">
                  <input
                    type="text"
                    value={updateCommentBody.value}
                    onChange={handleChange}
                  />
                  <button
                    onClick={() =>
                  updateComment(comment, updateCommentBody.value)
                    }
                  >
                    Update
                  </button>
                </div>
              ) : (
                  <div key={comment.id} className="comment-content">
                    {dataUserComment.map((user) => (
                    <div key={comment.id} className="user-of-comment">
                      {user.id === comment.userId
                        ? (<p>{user.firstname} {user.lastname}</p>)
                          : ('')}
                    </div>
                    ))}
                    <div key={comment.id + 3 + "li"} className="comment-content" >
                      <p>{comment.body}</p>
                    {localStorage.getItem('token') && dataAboutUser.id === comment.userId ? (
                      <div key={comment.id + 1} className="button-block">
                        <button onClick={() => openUpdateBlock(comment.id, comment.body)}>
                          Update
                        </button>
                        <button
                          key={comment.id + 2}
                          onClick={() => deleteComment(comment.id, comment.postId)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )}
            </div>
      ))}
    </div>
  );
};

export default Comments;
