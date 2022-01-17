import axios from 'axios';
import React from 'react';
import { Button } from './index';

var currentdate = new Date();
var datetime = currentdate.getFullYear() + "-" + currentdate.getMonth() 
+ "-" + currentdate.getDay() + "T" 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":"
+ currentdate.getSeconds();

function UpdatePost({title, body, userId, createAt}) {
    const [post, setPost] = React.useState({
    title: title,
    body: body,
    userId: userId,
    createdAt: createAt,
    updatedAt: createAt,
  });
  // console.log(userId);
  const getUpdatePost = () => {
      const data = {
          title: post.title,
          body: post.body,
          userId: '',
          createAt: post.createdAt,
          updatedAt: datetime
      }

      axios.patch(`https://ekreative-json-server.herokuapp.com/664/post/`, data)
  };

    function handleChange(e) {
      setPost({ value: e.target.value });
    }

  return (
    <div className="create-post">
      <h2>update your post</h2>
      <form>
        <div className="title-block">
          <p className="header-for-post-form">title</p>
          <input
            type="text"
            className="input-for-title"
            value={post.title}
            onChange={handleChange}
          />
        </div>

        <div className="post-block">
          <p className="header-for-post-form">post</p>
          <textarea
            type="text"
            className="input-for-post"
            value={post.body}
            onChange={handleChange}
          ></textarea>
        </div>

        <Button type="button" className="button-update" onClick={getUpdatePost}>
          Edit
        </Button>
      </form>
    </div>
  );
}

export default UpdatePost;