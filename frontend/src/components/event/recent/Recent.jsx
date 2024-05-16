import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import "./recent.css";
import axios from "axios";

function Recent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getEvents')
      .then(response => setEvents(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading style={{ fontFamily: 'Courier, monospace' }} title='Latest Events' subtitle='vibrant carnival celebrations and musical extravaganzas have been lighting up cities ' />

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
                    <button style={{ backgroundColor: '#E00947' }} className='btn2'>LKR.{event.price}/=</button> <label htmlFor=''>Price</label>
                  </div>
                  <span>Enjoy</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Recent;
