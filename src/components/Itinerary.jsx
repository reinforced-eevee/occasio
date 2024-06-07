import React, { useState, useEffect } from 'react';

const Itinerary = ({ selectedEventID }) => {
  const [eventDetails, setEventDetails] = useState('');

  const getEvent = () => {
    fetch(`/events/${selectedEventID}`)
      .then((res) => res.json())
      .then((data) => {
        setEventDetails(data);
      })
      .catch((err) => console.log('Error retrieving event details: ', err));
  };

  useEffect(setEventDetails, []);

  return (
    <div>
      <h2>Itinerary</h2>
      <div>My selected event ID is {selectedEventID}</div>
    </div>
  );
};

export default Itinerary;
