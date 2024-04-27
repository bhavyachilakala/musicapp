import React, { useState, useEffect } from 'react';
import '../main/style.css';
import '../main/form.css';
import config from '../config.js'

const ViewEvents = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${config.url}/viewevents`); // Fetch data from the backend
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handlePlay = (audioFileName) => {
    // Implement functionality to play audio here
    console.log('Playing audio:', audioFileName);
  };

  return (
    <div className='home-container'>
      <table border={2} align="center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Singer</th>
            <th>Audio</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event, index) => (
              <tr key={index}>
                <td>{event.title}</td>
                <td>{event.category}</td>
                <td>{event.description}</td>
                <td>
                  <div className="audio-container">
                    {event.audio && typeof event.audio === 'string' ? (
                      event.audio.endsWith('.mp3') ? (
                        <>
                          <audio controls>
                            <source src={`${config.url}/eventaudio/${event.file}`} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                          <span className="play-option" onClick={() => handlePlay(event.file)}>Play</span>
                        </>
                      ) : (
                        <a href={`${config.url}eventaudio/${event.file}`}>Download Audio</a>
                      )
                    ) : (
                      <span>No audio available</span>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" align="center">No events found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEvents;
