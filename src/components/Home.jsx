import React, { useState, useEffect } from 'react';
import HomeNavbar from './HomeNavbar';
import Questionnaire from './Questionnaire';
import EventsSidebar from './EventsSidebar';
import '../styling/Home.css';
import Itinerary from './Itinerary';

function Home() {
  const [user, setUser] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEventID, setSelectedEventID] = useState('');

  const getUser = () => {
    fetch('/action/getUser')
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setEvents(data.events);
      })
      .catch((err) => console.log('Error getting user: ', err));
  };
  useEffect(getUser, []);


  return (
    <div>
      <HomeNavbar />
      <div className="home-container">
        <EventsSidebar events={events} setSelectedEventID={setSelectedEventID} />
        <Itinerary selectedEventID={selectedEventID} />
      </div>
    </div>
  );
}

export default Home;
