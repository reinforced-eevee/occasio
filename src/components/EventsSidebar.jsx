import React, { useState } from 'react';
import '../styling/EventsSidebar.css'; // Assuming you will create a CSS file for styles

function EventsSidebar() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  //mock data
  const events = [
    { id: 1, name: 'Event 1', details: 'Details of Event 1' },
    { id: 2, name: 'Event 2', details: 'Details of Event 2' },
    { id: 3, name: 'Event 3', details: 'Details of Event 3' },
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className='events-sidebar'>
      <h3>My Events</h3>
      <div className='events-list'>
        {events.map((event) => (
          <div
            key={event.id}
            className='event-icon-box'
            onClick={() => handleEventClick(event)}
          >
            {event.icon} {event.name}
          </div>
        ))}
      </div>
      {/* {selectedEvent && (
        <div className='event-details'>
          <h4>{selectedEvent.name}</h4>
          <p>{selectedEvent.details}</p>
        </div>
      )} */}
    </div>
  );
}

export default EventsSidebar;
