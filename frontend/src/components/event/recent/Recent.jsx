import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Heading from "../../common/Heading";
import "./recent.css";
import axios from "axios";
import Alert from "./Alert";

function Recent() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/getEvents')
      .then(response => {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm) {
      const filtered = events.filter(event => event.location.toLowerCase().includes(searchTerm));
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  const addToCart = (eventId) => {
    const userId = Cookies.get('userId');
    axios.post('http://localhost:3001/addToCart', { userId, eventId })
      .then(response => {
        setShowAlert(true);
        console.log("Item added to cart:", response.data);
      })
      .catch(err => {
        console.error("Error adding item to cart:", err);
      });
  };

  return (
    <>
      {showAlert && <Alert message="Add successful!" onClose={() => setShowAlert(false)} />}
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
                      <button style={{ backgroundColor: '#E00947', color: 'white' }} className='btn2'>
                        <Link 
                          style={{ color: 'white' }} 
                          to={{
                            pathname: `/userpageticketbook`,
                            state: { price: event.price }
                          }}
                        >
                          LKR.{event.price}/=
                        </Link>
                      </button>
                      <label htmlFor=''>Price</label>
                    </div>
                    <button style={{backgroundColor:'white',color:'black'}} onClick={() => addToCart(event._id)}>Add to Cart</button>
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
