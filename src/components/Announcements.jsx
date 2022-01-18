import axios from 'axios';
import React from 'react';
import '../scss/components/announcements.scss'

const Announcements = ({title, body, id, userId}) => {
    const [userAnnouncements, setUserAnnouncements] = React.useState([])
    
    React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/664/users/${userId}`,)
      .then((response) => response.json())
        .then((data) => {
            setUserAnnouncements(data);
      });
  }, []);
    return (
        <div className='announcements'>
                <div key={id} className='announ'>
                    <h3>{title}</h3>
                    <p className='body-announ'>{body}</p>
                    {
                       
                    }
                </div>
        </div>
    )
}

export default Announcements;