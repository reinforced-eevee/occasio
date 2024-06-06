import React, { useState, useEffect } from 'react';

export default function Venues({ selectedEventID }) {

    const [venueDetails, setVenueDetails] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');

    // "aiVenues": {
    //     "venues": [
    //         {
    //             "name": "Curious Comedy Theater",
    //             "address": "5225 NE Martin Luther King Jr Blvd, Portland, OR 97211",
    //             "venue_description": "A dedicated comedy theater offering a stage for performances, ideal for an open mic comedy event."
    //         },

    const getEvent = () => {
        fetch(`/events/${selectedEventID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // setVenueDetails(data.aiVenues.venues);
                // setEventName(data.aiItinerary.name);
                // setEventDate(data.aiItinerary.date);
            })
            .catch((err) => console.log('Error retrieving event details: ', err));
    };

    useEffect(() => {
        getEvent();
    }, [selectedEventID]);

    return (
        <section className='venue-container event-container'>
            <div className='event-title'>
                <h1>Venues for {eventName} on {eventDate}</h1>
            </div>
            <div className='venue-list'>
                {venueDetails.map((venue) => (
                    <div className='venue-item'>
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

