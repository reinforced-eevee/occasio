import React, { useState, useEffect } from 'react';

export default function Playlist({ selectedEventID }) {
  const [playlistDetails, setPlaylistDetails] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-CA').replace(/-/g, '/');
  };

  const colorClasses = ['magenta', 'orange', 'lightOrange', 'yellow', 'purpPink'];

  const getEvent = () => {
    fetch(`http://localhost:3000/events/${selectedEventID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlaylistDetails(data.playlist);
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
        <section className='playlist-container event-container'>
            <div className='event-title'>
                {/* <h1>{playlistDetails.playlist}</h1> */}
                <h2>Playlist: {eventName}, {eventDate}</h2>
            </div>
            <div className='playlist-act-container act-container'>
                {playlistDetails && playlistDetails.map((song, index) => (
                    <div className={`playlist-item ${colorClasses[index % colorClasses.length]}`} key={song._id}>
                        <ul>
                            <li className='playlist-index'>{index + 1}.</li>
                                <ul>
                                    <li className='playlist-title'>Title: {song.song_title}</li>
                                    <li className='playlist-artist'>Artist: {song.artist}</li>
                                    <li className='playlist-genre'>Genre: {song.genre}</li>
                                </ul>
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}
