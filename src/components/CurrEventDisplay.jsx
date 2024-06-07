import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

import '../styling/EventDisplay.css';

import Itinerary from './Itinerary.jsx';
import Venues from './Venues.jsx';
import ShoppingList from './ShoppingList.jsx';
import Playlist from './Playlist.jsx';

export default function CurrEventDisplay({selectedEventID}) {

    return (
        <div className='event-container'>
            <section className='event-nav'>
                <Link className='eNav-link itin-link' to='home/itinerary'>Itinerary</Link>
                <Link className='eNav-link venue-link' to='home/venues'>Venues</Link>
                <Link className='eNav-link shoplist-link' to='home/shoplist'>Shopping List</Link>
                <Link className='eNav-link playlist-link' to='home/playlist'>Playlist</Link>
            </section>
            <section className='event-display'>
                <Routes> 
                    <Route index element={<Itinerary/>} />
                    <Route path='home/itinerary' element={<Itinerary selectedEventID={selectedEventID} />} />
                    <Route path='home/venues' element={<Venues selectedEventID={selectedEventID} />} />
                    <Route path='home/shoplist' element={<ShoppingList selectedEventID={selectedEventID} />} />
                    <Route path='home/playlist' element={<Playlist selectedEventID={selectedEventID} />} />
                </Routes>
            </section>
        </div>
    )
}

