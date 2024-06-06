import React, { useState, useEffect } from 'react';

export default function ShoppingList({ selectedEventID }) {
    const [shopListDetails, setShopListDetails] = useState({});

    const getEvent = () => {
        fetch(`/events/${selectedEventID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // setShopListDetails(data.aiShoppingList);
            })
            .catch((err) => console.log('Error retrieving event details: ', err));
    };

    useEffect(() => {
        getEvent();
    }, [selectedEventID]);
    
    return (
        <section className='shoplist-container event-container'>
            <div className='event-title'>
                <h1>Shopping List for {shopListDetails.event_name} on {shopListDetails.event_date}</h1>
            </div>
            <div className='shoppinglist'>
                {shopListDetails.shoppingList.map((item) => (
                    <div className='song-item'>
                    <h3><a href={item.item_link} target='_blank' rel='noopener noreferrer' className='shopList-titleLink'>{item.list_item}</a></h3>
                    <ul>
                        <li> Description:
                            <ul>
                                <li>{item.item_description}</li>
                            </ul>
                        </li>
                        <li>
                            Estimated Cost:
                            <ul>
                                <li>{item.estimated_cost}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                ))}
            </div>
        </section>
    )
}
