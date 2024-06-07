import React, { useState, useEffect } from 'react';

export default function Venues({ selectedEventID }) {
  console.log('Venue component line 5, EventID: ', selectedEventID);
  const [venueDetails, setVenueDetails] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-CA').replace(/-/g, '/');
  };

  const getEvent = () => {
    fetch(`http://localhost:3000/events/${selectedEventID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log('venues ', data.venues);
        console.log('selected event ID, ', selectedEventID);
        setVenueDetails(data.venues);
        setEventName(data.name);
        // setEventDate(data.date);
        const formattedDate = formatDate(data.date);
        setEventDate(formattedDate);
      })
      .catch((err) => console.log('Error retrieving event details: ', err));
  };

  useEffect(() => {
    getEvent();
  }, [selectedEventID]);

    return (
        <section className='venue-container event-container'>
            <div className='event-title'>
                <h1>Venues: {eventName}, {eventDate}</h1>
            </div>
            <div className='venue-act-container act-container'>
                {venueDetails && venueDetails.map((venue) => (
                    <div className='venue-item' key={venue.name}>
                        <h3>{venue.name}</h3>
                        <ul>
                            <li> Venue Address:
                                <ul>
                                    <li>{venue.address}</li>
                                </ul>
                            </li>
                            <li>
                                Venue Description:
                                <ul>
                                    <li>{venue.venue_description}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}
