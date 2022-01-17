import axios from 'axios';
import React from 'react';
import '../scss/components/announcements.scss'

const Announcements = () => {
    const [announcements, setAnnouncements] = React.useState([])
    const [userAnnouncements, setUserAnnouncements] = React.useState([])
console.log(announcements);
    
    React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/664/announcements?_sort=createdAt&_order=desc&_limit=10`)
      .then((response) => response.json())
        .then((data) =>[
            setAnnouncements(data)
        ]);
    }, []);
    
//     React.useEffect(() => {
//     fetch()
//       .then((response) => response.json())
//         .then((data) => {
//             setUserAnnouncements(data);
//       });
//   }, []);
    return (
        <div className='announcements'>
            {announcements.map(announ => (
                <div key={announ.id} className='announ'>
                    <h3>{announ.title}</h3>
                    <p>{announ.body}</p>
                    {
                        axios.get(`https://ekreative-json-server.herokuapp.com/664/users/${announ.userId}`)
                        .then(response => console.log(response.data))
                    }
                </div>
            ))}
        </div>
    )
}

export default Announcements;