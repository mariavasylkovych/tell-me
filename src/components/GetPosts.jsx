import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, PostBlock, Pagination } from "./index";
import { setAddData, setGetPostsPage } from "../redux/action";
import "../scss/components/getPosts.scss";
import Announcements from "./Announcements";

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

const GetPosts = () => {
  const [posts, setPosts] = React.useState([]);
  // const [isLoaded, setIsLoaded] = React.useState(false);
  // const [error, setError] = React.useState(null);
  const [updateDataPost, setUpdateDataPost] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(10);

  //redux
  const dispatch = useDispatch();
  const postReducer = useSelector((state) => state.postReducer);
  const postsPages = useSelector((state) => state.paginateReducer);
  console.log(postsPages);

  //pagination
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = posts.slice(firstPostIndex, lastPostIndex)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/664/posts`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  const getUpdatePost = () => {
    postsPages.map((dataPost) => {
      setUpdateDataPost({
        title: dataPost.title,
        body: dataPost.body,
        userId: dataPost.userId,
        createAt: dataPost.createdAt,
        updatedAt: datetime,
      });
    });

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };

    axios.patch(
      `https://ekreative-json-server.herokuapp.com/664/post`,
      updateDataPost,
      {headers}
    );
  };

  const handleChange = (e) => {
    dispatch(setAddData({ title: e.target.title, body: e.target.body }));
  };

  return (
    <div className="get-posts" id="posts">
      {postsPages.map((dataPost) => (
        <PostBlock key={dataPost.id} {...dataPost} />
      ))}
      {postReducer.map((dataUpdatePost) => (
        <div id="update-post" key={dataUpdatePost.id}>
          <div className="close">
            <span className="material-icons-outlined">&times;</span>
          </div>
          <div className="modal-content">
            <h2>update your post</h2>
            <form action="">
              <div className="title-block">
                <p className="header-for-post-form">title</p>
                <input
                  type="text"
                  className="input-for-title"
                  value={dataUpdatePost.title}
                  onChange={handleChange}
                />
              </div>
              <div className="post-block">
                <p className="header-for-post-form">post</p>
                <textarea
                  type="text"
                  className="input-for-post"
                  value={dataUpdatePost.body}
                  onChange={handleChange}
                >
                  {dataUpdatePost.body}
                </textarea>
              </div>
              <Button
                type="button"
                className="button-update"
                onClik={getUpdatePost}
              >
                Edit
              </Button>{" "}
            </form>
          </div>
        </div>
      ))}
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} />
      <Announcements />
    </div>
  );
};

export default GetPosts;
