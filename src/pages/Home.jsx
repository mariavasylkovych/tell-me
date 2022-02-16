// import axios from 'axios';
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { GetPosts } from "../components/index";
import { setPosts, setDataAnnouncements, setGetPostsPage } from "../redux/action";
import "../scss/app.scss";
import "../scss/components/button.scss";

function Home() {
  // const dataUser = useSelector(state => state.userReducer)
  // console.log(dataUser);

  let data = JSON.parse(localStorage.user);

  const dispatch = useDispatch();
  const openMenu = () => {
    document.getElementById("menu").classList.toggle("show");
  };

  const deletToken = () => {
    localStorage.removeItem("token");
    document.location.reload(true);
  };

  React.useEffect(() => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/664/announcements?_sort=createdAt&_order=desc&_limit=10`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setDataAnnouncements(data));
      });
  }, []);

  React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/664/posts`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPosts(data));
      });
  }, []);

  React.useEffect(() => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/posts?_page=${1}&_limit=${10}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setGetPostsPage(data));
      });
  }, []);

  return (
    <div className="home">
      {localStorage.getItem("token") ? (
        <div className="for-autho-user">
          <div className="menu-block">
            <div className="data-of-user">
              <img className="avatar" src={data.avatar} alt="" />
              <Link to="user-page">
                <p>
                  {data.firstname} {data.lastname}
                </p>
              </Link>
            </div>
            <img
              src="https://img.icons8.com/ios-glyphs/30/ffffff/menu--v1.png"
              onClick={openMenu}
              className="menu-icon"
            />
            <ul id="menu">
              <Link to="create">
                <li>
                  Cre<span>a</span>te
                </li>
              </Link>
              <Link to="/">
                <li onClick={deletToken}>
                  Log<span>o</span>ut
                </li>
              </Link>
            </ul>
          </div>

          <div className="content-header">
            <h1>
              Tell <span>me</span>
            </h1>
            <p>
              Welcome to home! <br />
              May be you want write post about new dream or little history...{" "}
              <br /> You may do it here:
            </p>
            <Link to="create" className="button-home">
              Create new post
            </Link>
          </div>
        </div>
      ) : (
        <div className="home-header">
          <h1>
            Tell <span>me</span>
          </h1>
          <p>
            Hi! Here you may write posts about your life, your dreams and share
            your purpose!!! <br /> Also you may read it about other people...
            Have a nice tripe in our world!
          </p>
          <div>
            <Link to="login" className="button-home">
              Login
            </Link>
            <span>or</span>
            <Link to="/signup" className="button-home">
              Register
            </Link>
          </div>
        </div>
      )}
      <div className="home-content">
        <GetPosts />
        {/* <NavLink to={'/login'}>Login</NavLink><br/>
            <NavLink to={'/signup'}>signup</NavLink> */}
      </div>
    </div>
  );
}

export default Home;
