import React, { useState, useEffect } from 'react';
import HomeNavbar from './HomeNavbar';
import Questionaire from './Questionaire';
import EventsSidebar from './EventsSidebar';
import '../styling/Home.css';
import Itinerary from './Itinerary';
import CurrEventDisplay from './CurrEventDisplay';

function Home() {
  const [user, setUser] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEventID, setSelectedEventID] = useState('');

  const getUser = () => {
    fetch('/action/getUser')
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        // console.log('user is ' + data._id);
        setEvents(data.events);
      })
      .catch((err) => console.log('Error getting user: ', err));
  };
  useEffect(getUser, []);

  return (
    <div>
      <HomeNavbar />
      <div className='home-container'>
        <EventsSidebar
          events={events}
          setSelectedEventID={setSelectedEventID}
          userID={user._id}
        />
        {/* {selectedEventID && <Itinerary event={selectedEventID} />} */}
        <CurrEventDisplay selectedEventID={selectedEventID} />
        <Itinerary selectedEventID={selectedEventID} events={events} />
      </div>
    </div>
  );
}

export default Home;
