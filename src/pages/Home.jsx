// import axios from 'axios';
import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Button, GetPosts } from "../components/index";
import "../scss/app.scss";
import '../scss/components/button.scss'

function Home() {
  
  // const dataUser = useSelector(state => state.userReducer)
  // console.log(dataUser);

  let data = JSON.parse(localStorage.user)

    const openMenu = () => {
        document.getElementById('menu').classList.toggle("show")  
    }
  
  const deletToken = () => {
    localStorage.removeItem('token')
    document.location.reload(true)
  }

  return (
    <div className="home">
      {localStorage.getItem('token') ? (
        <div className="for-autho-user">
         
          <div className="menu-block">
            <div className="data-of-user">
            <img className="avatar" src={data.avatar} alt="" />
            <Link to='user-page'><p>{data.firstname} {data.lastname}</p></Link>
          </div>
            <img  src="https://img.icons8.com/ios-glyphs/30/ffffff/menu--v1.png" onClick={openMenu} className="menu-icon"/>
            <ul id="menu">
              <Link to="create"><li>Cre<span>a</span>te</li></Link>
              <Link to='/'><li onClick={deletToken}>Log<span>o</span>ut</li></Link>
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
            <Link to="create">
              <Button className="button-home">Create new post</Button>
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
            <Link to="login">
              <Button className="button-home">Login</Button>
            </Link>
            <span>or</span>
            <Link to="/signup">
              <Button className="button-home">Register</Button>
            </Link>
            {/* <Link to=''><span className='arrow'>&#709;</span></Link> */}
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
