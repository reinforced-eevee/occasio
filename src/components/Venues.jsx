import React, { useState, useEffect } from 'react';

export default function Venues({ selectedEventID }) {
    
    const [eventDetails, setEventDetails] = useState('');

    const getEvent = () => {
        fetch(`/events/${selectedEventID}`)
            .then((res) => res.json())
            .then((data) => {
                setEventDetails(data);
            })
            .catch((err) => console.log('Error retrieving event details: ', err));
    };

    return (
        <div>
            <h1>Venues</h1>
        </div>
    )
}

