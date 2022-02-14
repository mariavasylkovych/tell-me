import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./index";
import "../scss/components/createPost.scss";
import { useSelector } from "react-redux";

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

function AnnounEdit() {

  const [editAnnoun, setEditAnnoun] = React.useState({
    title: '',
    body: '',
  });
  const dataAnnoun = useSelector(state => state.announReducer)
console.log(dataAnnoun);

  const getUpdateAnnoun = () => {
    const data = {
      title: editAnnoun.title,
      body: editAnnoun.body,
      updatedAt: datetime,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };

    axios.patch(`https://ekreative-json-server.herokuapp.com/664/announcements/${dataAnnoun.id}`, data, {
      headers,
    });

    // axios.get(`https://ekreative-json-server.herokuapp.com/664/announcements/${dataAnnoun.id}`)
    // .then(response => dispatch())
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setEditAnnoun((prevState) => ({ ...prevState, [e.target.name]: value }));
  }
    
    const deleteAnnoun = () => {
        const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };

    axios.delete(`https://ekreative-json-server.herokuapp.com/664/announcements/${dataAnnoun.id}`,
        headers
      );
    }

  return (
    <div className="create-post">
      <h2>edit or delete this announcement</h2>
      <form action="">
        <div className="title-block">
          <input
            type="text"
            className="input-for-title"
            value={dataAnnoun.title}
            name="title"
            onChange={handleChange}
          />
          <textarea
            type="text"
            className="input-for-post"
            value={dataAnnoun.body}
            name="body"
            onChange={handleChange}
          ></textarea>
        </div>

        <Link to='/'>
          <Button
            type="button"
            className="button-create"
            onClick={getUpdateAnnoun}
          >
            Update
                  </Button>
                  <Button onClick={deleteAnnoun} type="button"
            className="button-create">
                      Delete
                  </Button>
        </Link>
      </form>
     <Link to='/' className="logo"><h2 className="logo">Tell <span>me</span></h2></Link>
    </div>
  );
}

export default AnnounEdit;
