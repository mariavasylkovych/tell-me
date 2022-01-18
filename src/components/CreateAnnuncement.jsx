import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./index";
import "../scss/components/createPost.scss";

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

function CreateAnnouncement() {
  const [announ, setAnnoun] = React.useState({
    title: "",
    body: "",
  });

  let dataAboutUser = JSON.parse(localStorage.user);

  const getCreateAnnoun = () => {
    const data = {
      title: announ.title,
      body: announ.body,
      userId: dataAboutUser.id,
      createAt: datetime,
      updatedAt: datetime,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };

    axios.post("https://ekreative-json-server.herokuapp.com/664/posts", data, {
      headers,
    });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setAnnoun((prevState) => ({ ...prevState, [e.target.name]: value }));
  }

  return (
    <div className="create-post">
      <h2>write new announcement</h2>
      <form action="">
        <div className="title-block">
          <input
            type="text"
            className="input-for-title"
            value={announ.title}
            name="title"
            placeholder="title of your announcement"
            onChange={handleChange}
          />
          <textarea
            type="text"
            className="input-for-post"
            value={announ.body}
            name="body"
            placeholder="text of your news"
            onChange={handleChange}
          ></textarea>
        </div>

        <Link to='/'>
          <Button
            type="button"
            className="button-create"
            onClick={getCreateAnnoun}
          >
            Create
          </Button>
        </Link>
      </form>
     <Link to='/' className="logo"><h2 className="logo">Tell <span>me</span></h2></Link>
    </div>
  );
}

export default CreateAnnouncement;