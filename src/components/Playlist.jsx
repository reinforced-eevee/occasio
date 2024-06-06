import React, { useState, useEffect } from 'react';

export default function Playlist({ selectedEventID }) {
    const [playlistDetails, setPlaylistDetails] = useState({});

    const getEvent = () => {
        fetch(`/events/${selectedEventID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // setPlaylistDetails(data.aiPlaylist);
            })
            .catch((err) => console.log('Error retrieving event details: ', err));
    };

    useEffect(() => {
        getEvent();
    }, [selectedEventID]);

    return (
        <section className='playlist-container event-container'>
            <div className='event-title'>
                <h1>{playlistDetails.playlist_title}</h1>
                <h2>{playlistDetails.event_name}, {playlistDetails.event_date}</h2>
            </div>
            <div className='playlist'>
                {playlistDetails.playlist.map((song, index) => (
                    <div className='playlist-item'>
                        <ul>
                            <li>{index}.</li>
                                <ul>
                                    <li>Title: {song.song_title}</li>
                                    <li>Artist: {song.artist}</li>
                                    <li>Genre: {song.genre}</li>
                                </ul>
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}

