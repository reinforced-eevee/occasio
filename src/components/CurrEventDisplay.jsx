import React, { useState, useEffect } from 'react';
import { Route, Routes} from 'react-router-dom';

import {Itinerary} from './Itinerary.jsx';
import {Venues} from './Venues.jsx';
import {ShoppingList} from './ShoppingList.jsx';
import {Playlist} from './Playlist.jsx';

export default function CurrEventDisplay({selectedEventID}) {
    return (
        <div className='event-container'>
            <section className='event-nav'>
                <Link className='eNav-link' to='/itinerary'>Itinerary</Link>
                <Link className='eNav-link' to='/venues'>Venues</Link>
                <Link className='eNav-link' to='/shoplist'>Shopping List</Link>
                <Link className='eNav-link' to='/playlist'>Playlist</Link>
            </section>
            <section className='event-display'>
                <Routes> 
                    <Route path='/itinerary' element={} />
                    <Route path='/venues' element={} />
                    <Route path='/shoplist' element={} />
                    <Route path='/playlist' element={} />
                </Routes>
            </section>
        </div>
    )
}

