import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import "./adminshowevent.css";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminShowEvent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:3001/getEvents')
      .then(response => setEvents(response.data))
      .catch(err => console.log(err));
  };

  const handleDelete = (eventId) => {
    axios.delete(`http://localhost:3001/deleteEvent/${eventId}`)
      .then(() => {
        // Update the events list after successful deletion
        fetchEvents();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading style={{ fontFamily: 'Courier, monospace' }} title='Admin Panel Events' subtitle='' />

          <div className='content grid3 mtop'>
            {events.map(event => (
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
                    {/* Pass event._id to the handleDelete function */}
                    <button style={{ backgroundColor: '#E00947'}} className='btn2' onClick={() => handleDelete(event._id)}>Delete</button>
                  </div>
                  {/* Use Link to navigate to the update page */}
                  <Link to={`/adminupdateevent/${event._id}`}>
                    <button style={{ backgroundColor: 'white', color:'black' }} className='btn2'>Update</button> 
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminShowEvent;
