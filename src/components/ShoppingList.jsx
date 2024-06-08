import React, { useState, useEffect } from 'react';

export default function ShoppingList({ selectedEventID }) {
    const [shopListDetails, setShopListDetails] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');

    const colorClasses = ['magenta', 'orange', 'lightOrange', 'yellow', 'purpPink'];

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('en-CA').replace(/-/g, '/');
      };

    const getEvent = () => {
        fetch(`http://localhost:3000/events/${selectedEventID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setShopListDetails(data.shoppingList);
                setEventName(data.name);
                const formattedDate = formatDate(data.date);
        setEventDate(formattedDate);
            })
            .catch((err) => console.log('Error retrieving event details: ', err));
    };

    useEffect(() => {
        getEvent();
    }, [selectedEventID]);
    
    return (
        <section className='shoplist-container event-container'>
            <div className='event-title'>
                <h1>Shopping List: {eventName}, {eventDate}</h1>
            </div>
            <div className='shoplist-act-container act-container'>
                {shopListDetails && shopListDetails.map((item, index) => (
                    <div className={`shoplist-item ${colorClasses[index % colorClasses.length]}`} key={item._id}>
                    <h3><a href={item.item_link} target='_blank' rel='noopener noreferrer' className='shopList-titleLink'>{item.list_item}</a></h3>
                    <ul>
                        <li className='shoplist-item-title'> Description:
                            <ul>
                                <li className='shoplist-item-descrip'>{item.item_description}</li>
                            </ul>
                        </li>
                        <li className='shoplist-item-title'>
                            Estimated Cost:
                            <ul>
                                <li className='shoplist-item-descrip'>{item.estimated_cost}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                ))}
            </div>
        </section>
    )
}

