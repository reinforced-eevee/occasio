import React, { useState, useEffect } from 'react';
import { Route, Routes} from 'react-router-dom';

export default function CurrEventDisplay({event}) {
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
                    <Route path='/itinerary' element={event.itinerary} />
                    <Route path='/venues' element={event.venues} />
                    <Route path='/shoplist' element={event.shopList} />
                    <Route path='/playlist' element={event.playlist} />
            </Routes>
            </section>
        </div>
    )
}

