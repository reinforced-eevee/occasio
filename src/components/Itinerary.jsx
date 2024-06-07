import React, { useState, useEffect } from 'react';

const Itinerary = ({ events, selectedEventID }) => {
  // console.log('selectedEventID', selectedEventID);
  const [eventDetails, setEventDetails] = useState({
    activities: [],
  });

  const getEvent = () => {
    const url = `http://localhost:3000/events/${selectedEventID}`;
    //   console.log('Fetching from URL:', url); // Log the URL to check it
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //   console.log('Data:', data);
        setEventDetails(data);
      })
      .catch((err) => console.log('Error retrieving event details: ', err));
  };
  //   const getEvent = () => {
  //     const url = `http://localhost:3000/events/${selectedEventID}`;
  //     // console.log('Fetching from URL:', url); // Log the URL to check it
  //     fetch(url)
  //       .then((res) => {
  //         // console.log('Raw Response:', res); // Log the raw response
  //         return res.json(); // Parse the response to JSON
  //       })
  //       .then((data) => {
  //         // console.log('Data:', data); // Log the parsed data
  //         setEventDetails(data);
  //       })
  //       .catch((err) => console.log('Error retrieving event details: ', err));
  //   };

  useEffect(() => {
    getEvent();
  }, [selectedEventID]);

  return (
    <section className='itin-container'>
      <div className='event-title'>
        <h1>
          Itinerary for {eventDetails.name} on {eventDetails.date}
        </h1>
      </div>

      <div className='itin-activities'>
        {eventDetails.activities &&
          eventDetails.activities.map((activity, index) => (
            <div className='itin-activity' key={index}>
              <ul>
                <li>
                  <h3>
                    {activity.activity}: {activity.time_range}
                  </h3>
                  <ul>
                    <li>{activity.activity_details}</li>
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
