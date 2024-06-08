import React, { useState, useEffect } from 'react';

import '../styling/EventComp.css';

const Itinerary = ({ events, selectedEventID }) => {
  // console.log('selectedEventID', selectedEventID);
  const [eventDetails, setEventDetails] = useState({
    activities: [],
    name: '',
    date: '',
  });

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-CA').replace(/-/g, '/');
  };

  const getEvent = () => {
    const url = `http://localhost:3000/events/${selectedEventID}`;
    //   console.log('Fetching from URL:', url); // Log the URL to check it
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const formattedDate = formatDate(data.date);
        setEventDetails({
          ...data,
          date: formattedDate, // Set the formatted date
        });
      })
      .catch((err) => console.log('Error retrieving event details: ', err));
  };

  useEffect(() => {
    getEvent();
  }, [selectedEventID]);


  const colorClasses = ['magenta', 'orange', 'lightOrange', 'yellow', 'pink', 'purpPink'];

  //temp styling to make it visible on dark background
  // const itineraryStyles = {
  //   backgroundColor: '#333', // Dark background
  //   color: '#fff', // White text color
  //   padding: '20px',
  //   borderRadius: '8px',
  //   boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  // };

  // const titleStyle = {
  //   borderBottom: '1px solid #555',
  //   paddingBottom: '10px',
  //   marginBottom: '20px',
  // };

  return (
    <section className='itin-container event-container'>
      <div className='event-title'>
        <h1>
          Itinerary: {eventDetails.name}, {eventDetails.date}
        </h1>
      </div>

      <div className='itin-act-container act-container'>
        {eventDetails.activities &&
          eventDetails.activities.map((activity, index) => (
            <div className={`itin-activity ${colorClasses[index % colorClasses.length]}`} key={index}>
              <ul>
                <li>
                  <h3 className='itin-activity-title'>
                    {activity.activity}: {activity.time_range}
                  </h3>
                  <ul>
                    <li className='itin-activity-details'>{activity.activity_details}</li>
                  </ul>
                </li>
              </ul>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Itinerary;
