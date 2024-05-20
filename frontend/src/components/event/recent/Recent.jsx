import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import "./recent.css";
import axios from "axios";

function Recent() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); // State for filtered events
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    axios.get('http://localhost:3001/getEvents')
      .then(response => {
        setEvents(response.data);
        setFilteredEvents(response.data); // Initially set filtered events to all events
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase(); // Convert search term to lowercase for case-insensitive matching
    setSearchTerm(searchTerm);

    if (searchTerm) {
      const filtered = events.filter(event => event.location.toLowerCase().includes(searchTerm));
      setFilteredEvents(filtered);
    } else {
      // If search term is empty, reset filtered events to all events
      setFilteredEvents(events);
    }
  };

  return (
    <>
      <section className='featured background'>
        <div className='container'>
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Search location...'
              value={searchTerm}
              onChange={handleSearch}
              style={{
                width: '80%',
                borderRadius: '30px',
                padding: '10px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </section>

      <section className='recent padding'>
        <div className='container'>
          <Heading style={{ fontFamily: 'Courier, monospace' }} title='Latest Events' subtitle='vibrant carnival celebrations and musical extravaganzas have been lighting up cities ' />

          <div className='content grid3 mtop'>
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <div className='box shadow' key={event._id}>
                  <div className='img'>
                    <img style={{ height: '400px' }} src={`./images/event/${event.image}`} alt='' />
                  </div>
                  <div className='text'>
                    <div className='category flex'>
                      <span>{event.category}</span>
                      <i className='fa fa-heart'></i>
                    </div>
                    <h4>{event.eventName}</h4>
                    <p>
                      <i className='fa fa-location-dot'></i> {event.location}
                    </p>
                  </div>
                  <div className='button flex'>
                    <div>
                      <button style={{ backgroundColor: '#E00947' }} className='btn2'>LKR.{event.price}/=</button> <label htmlFor=''>Price</label>
                    </div>
                    <span>Enjoy</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No events found for your search location.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Recent;
