import React, { useState, useEffect } from 'react';
import '../styling/EventsSidebar.css';

function EventsSidebar({ events, selectedEventID, setSelectedEventID }) {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    if (events.length > 0) {
      setSelectedEventID(events[0]._id);
    }
  }, [events, setSelectedEventID]);

  return (
    <div className='events-sidebar'>
      <h3>My Events</h3>
      <div className='events-list'>
        {events.map((event) => (
          <div
            key={event._id}
            className={
              selectedEventID === event._id
                ? 'event-icon-box selected'
                : 'event-icon-box'
            }
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
