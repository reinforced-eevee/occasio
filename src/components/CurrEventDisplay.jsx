import React, { useState, useEffect } from 'react';
import { Route, Routes, Link} from 'react-router-dom';

import '../styling/EventDisplay.css';

import Itinerary from './Itinerary.jsx';
import Venues from './Venues.jsx';
import ShoppingList from './ShoppingList.jsx';
import Playlist from './Playlist.jsx';

export default function CurrEventDisplay({selectedEventID}) {

    return (
        <div className='event-container'>
            <section className='event-nav'>
                <Link className='eNav-link itin-link' to='/itinerary'>Itinerary</Link>
                <Link className='eNav-link venue-link' to='/venues'>Venues</Link>
                <Link className='eNav-link shoplist-link' to='/shoplist'>Shopping List</Link>
                <Link className='eNav-link playlist-link' to='/playlist'>Playlist</Link>
            </section>
            <section className='event-display'>
                <Routes> 
                    <Route path='/itinerary' element={<Itinerary eventId={selectedEventID} />} />
                    <Route path='/venues' element={<Venues eventId={selectedEventID} />} />
                    <Route path='/shoplist' element={<ShoppingList eventId={selectedEventID} />} />
                    <Route path='/playlist' element={<Playlist eventId={selectedEventID} />} />
                </Routes>
            </section>
        </div>
    )
}

