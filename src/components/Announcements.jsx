import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAnnounUser, setDataEditAnnoun } from "../redux/action";
import "../scss/components/announcements.scss";

const Announcements = () => {
  const [announcements, setAnnouncements] = React.useState([]);

  let dataAboutUser = JSON.parse(localStorage.user);
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.announReducer);

  // console.log(userData);

  React.useEffect(() => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/664/announcements?_sort=createdAt&_order=desc&_limit=10`
    )
      .then((response) => response.json())
      .then((data) => [setAnnouncements(data)]);
  });

  

  return (
    <div className="announcements-home">
      <h3 className="header-announs">announcements</h3>
      <div className="announcements">
        {announcements.map((announ) => (
          <div key={announ.id} className="announ">
            <div>
              <h3>{announ.title}</h3>
              <p className="body-announ">{announ.body}</p>
            </div>
            <div className="buttom-announ">{
              localStorage.getItem('token') /*&& dataAboutUser.id === announ.id } */? (
              <button onClick={() => {dispatch(setDataEditAnnoun(announ)), history.push("/edit-announ")}} className="button-edit-announ">Edit</button>
              ) : (
                  '' 
              )
            }<p></p>
            </div>
          </div>
        ))}
      </div>
      {localStorage.getItem("token") ? (
        <div className="block-button-announ">
          <Link to="/create-announ">
            <button className="button-add-announ">Add new announcement</button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Announcements;
