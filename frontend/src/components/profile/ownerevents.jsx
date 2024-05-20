import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom'; // Import Link here
import Cookies from 'js-cookie';
import axios from 'axios';
import "../admin/adminshowevent.css";

// Assuming you have a Heading component, import it here

const Ownerevents = () => {
  const [events, setEvents] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const storedUserId = Cookies.get('userId');

  useEffect(() => {
    if (!storedUserId) {
      setRedirect(true);
    } else {
      fetchUserEvents(storedUserId);
    }
  }, [storedUserId]);

  const fetchUserEvents = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/onlyuserevents/${userId}`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (eventId, userId) => {
    try {
      await axios.delete(`http://localhost:3001/deleteEvent/${eventId}`);
      // Update the events list after successful deletion
      fetchUserEvents(userId);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleLogout = () => {
    // Remove cookies
    Cookies.remove('userId');
    Cookies.remove('userName');
    Cookies.remove('userEmail');
    // Redirect to login page
    setRedirect(true);
  };

  if (redirect) {
    history.push('/login');
    // Refresh the page
    window.location.reload();
    return null;
  }

  return (
    <>
      <div className="admin-panel" style={{ display: "flex" }}>
        <div className="left-panel">
          <button><a style={{ color: 'white' }} href='/profile'>Profile</a></button>
          <button><a style={{ color: 'white' }} href='/eventadd'>Add Events</a></button>
          <button><a style={{ color: 'white' }} href='/servicesadd'>Add Services</a></button>
          <button><a style={{ color: 'white' }} href='/ownerevents'>My Events</a></button>
          <button><a style={{ color: 'white' }} href='/ownerservices'>My Services</a></button>
          <button><a style={{ color: 'white' }} href='/userhelp'>Help</a></button>
          <button onClick={handleLogout}>Log out</button>
        </div>

        <div className="right-panel" style={{ flexGrow: 1, overflow: 'auto' }}>
          <section className="recent padding">
            <div className="container">
              <div className="content grid3 mtop">
                {loading ? (
                  <p>Loading events...</p>
                ) : events.length > 0 ? (
                  events.map((event) => (
                    <div className="box shadow" key={event._id}>
                      <div className="img">
                        <img
                          style={{ height: "400px" }}
                          src={`./images/event/${event.image}`}
                          alt=""
                        />
                      </div>
                      <div className="text">
                        <div className="category flex">
                          <span>{event.category}</span>
                          <i className="fa fa-heart"></i>
                        </div>
                        <h4>{event.eventName}</h4>
                        <p>
                          <i className="fa fa-location-dot"></i> {event.location}
                        </p>
                      </div>
                      <div className="button flex">
                        <div>
                          <button
                            style={{ backgroundColor: "#E00947" }}
                            className="btn2"
                            onClick={() => handleDelete(event._id, storedUserId)}
                          >
                            Delete
                          </button>
                        </div>
                        <Link to={`/usereventupdate/${event._id}`}>
                          <button
                            style={{ backgroundColor: "white", color: "black" }}
                            className="btn2"
                          >
                            Update
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No events found for your search location.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Ownerevents;
