import React, { useState, useEffect } from 'react';

export default function Playlist({ selectedEventID }) {
  const [playlistDetails, setPlaylistDetails] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-CA').replace(/-/g, '/');
  };

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
        <h2>
          Playlist for {eventName} on {eventDate}
        </h2>
      </div>
      <div className='playlist'>
        {playlistDetails &&
          playlistDetails.map((song, index) => (
            <div className='playlist-item' key={song._id}>
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
  );
}
