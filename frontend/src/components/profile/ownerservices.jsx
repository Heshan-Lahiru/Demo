import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import "../admin/adminshowevent.css";
import Ownerevents from './ownerevents';

const Ownerservices = () => {
  const [soundServices, setSoundServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const storedUserId = Cookies.get('userId');

  useEffect(() => {
    if (!storedUserId) {
      // Redirect to login page if userID is not found in cookies
      history.push('/login');
    } else {
      fetchUserSoundServices(storedUserId);
    }
  }, [storedUserId, history]);

  const fetchUserSoundServices = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/onlyusersounds/${userId}`);
      setSoundServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sound services:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:3001/deleteSoundService/${serviceId}`);
      // Remove the deleted sound service from the state
      setSoundServices(soundServices.filter(service => service._id !== serviceId));
    } catch (error) {
      console.error('Error deleting sound service:', error);
    }
  };

  const handleUpdate = (serviceId) => {
    // Redirect to the update page with the serviceId as a URL parameter
    history.push(`/edituserservice/${serviceId}`);
  };

  const handleLogout = () => {
    // Remove cookies
    Cookies.remove('userId');
    Cookies.remove('userName');
    Cookies.remove('userEmail');
    // Redirect to login page
    history.push('/login');
  };

  return (
    <div className="admin-panel">
      <div className="left-panel">
        <button><a style={{color:'white'}} href='/profile'>Profile</a></button>
        <button><a style={{color:'white'}} href='/eventadd'>Add Events</a></button>
        <button><a style={{color:'white'}} href='/servicesadd'>Add Services</a></button>
        <button><a style={{color:'white'}} href='/ownerevents'>My Events</a></button>
        <button><a  style={{color:'white'}} href='/ownerservices'>My Services</a></button>
        <button><a style={{color:'white'}} href='/userhelp'>Help</a></button>
        <button onClick={handleLogout}>Log out</button>
      </div>

      <div className="right-panel">
        <section className="recent padding">
          <div className="container">
            <div className="content grid3 mtop">
              {loading ? (
                <p>Loading sound services...</p>
              ) : soundServices.length > 0 ? (
                soundServices.map((service) => (
                  <div className="box shadow" key={service._id}>
                    <div className="img">
                      <img
                        style={{ height: "400px" }}
                        src={`./images/event/${service.image}`}
                        alt=""
                      />
                    </div>
                    <div className="text">
                      <div className="category flex">
                        <span>{service.name}</span>
                        <i className="fa fa-heart"></i>
                      </div>
                      <h4>{service.name}</h4>
                      <p>
                        <i className="fa fa-location-dot"></i> {service.location}
                      </p>
                    </div>
                    <div className="button flex">
                      <button
                        style={{ backgroundColor: "white", color: "black" }}
                        className="btn2"
                        onClick={() => handleUpdate(service._id)}
                      >
                        Update
                      </button>
                      <button onClick={() => handleDelete(service._id)}>Delete</button>
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
  );
};

export default Ownerservices;
