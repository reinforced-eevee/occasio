import React, { useState, useEffect } from 'react';
import '../styling/EventsSidebar.css';

function EventsSidebar({ events, setSelectedEventID }) {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensures cookies are sent with the request
        });
        if (response.ok) {
          const data = await response.json();
          setUserEvents(data);
          if (data.length > 0) {
            setSelectedEventID(data[data.length - 1]._id); // Automatically select the last event
          }
        } else {
          throw new Error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [setSelectedEventID]);

  return (
    <div className='events-sidebar'>
      <h3>My Events</h3>
      <div className='events-list'>
        {userEvents.map((event) => (
          <div
            key={event._id}
            className='event-icon-box'
            onClick={() => setSelectedEventID(event._id)}
          >
            {event.icon} {event.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsSidebar;
