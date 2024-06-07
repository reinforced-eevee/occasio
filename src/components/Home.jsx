import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
import Questionnaire from './Questionnaire';
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

  // console.log('EventID Home Component, line 26: ', selectedEventID);

  return (
    <div className="home">
      <HomeNavbar />
      <div className="home-container">
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
