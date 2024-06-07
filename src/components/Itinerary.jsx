import React, { useState, useEffect } from 'react';

export default function Itinerary({ selectedEventID }) {
    const [itinDetails, setItinDetails] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');

    const getEvent = () => {
        fetch(`/events/${selectedEventID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setItinDetails(data.activities);
            })
            .catch((err) => console.log('Error retrieving event details: ', err));
    };

    useEffect(() => {
        getEvent();
    }, [selectedEventID]);

    return (
        <section className='itin-container'>
            <div className='event-title'>
                <h1>Itinerary for {eventName} on {eventDate}</h1>
            </div>
            <div className='itin-activities'>
                {itinDetails.map((activity) => (
                    <div className='itin-activity'>
                        <ul>
                            <li><h3>{activity.activity}: {activity.time_range}</h3>
                                <ul>
                                    <li>{activity.activity_details}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}
