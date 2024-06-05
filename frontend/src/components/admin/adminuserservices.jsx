import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminhome.css';

const AdminShowServices = () => {
  const [soundServices, setSoundServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSoundServices();
  }, []);

  const fetchSoundServices = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getSoundServices');
      setSoundServices(response.data);
    } catch (error) {
      console.error('Error fetching sound services:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.trim().toLowerCase());
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteSoundService/${id}`);
      // Remove the deleted service from the state
      setSoundServices(soundServices.filter(service => service._id !== id));
    } catch (error) {
      console.error('Error deleting sound service:', error);
    }
  };

  const filteredSoundServices = soundServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="admin-panel">
      <div className="left-panel">
        <button><a style={{ color: 'white' }} href='/adminhome'>Users</a></button>
        <button><a style={{ color: 'white' }} href='/adminticket'>Ticket Booking</a></button>
        <button><a style={{ color: 'white' }} href='/adminrate'>Rates</a></button>
        <button><a style={{ color: 'white' }} href='/adminservices'>Services</a></button>
        <button><a style={{ color: 'white' }} href='/adminshowservices'>Show Services</a></button>
        <button><a style={{ color: 'white' }} href='/adminshowevent'>Events</a></button>
        <button><a style={{ color: 'white' }} href='/adminhelp'>Setting</a></button>
      </div>
      <div className="right-panel" style={{ flexGrow: 1, overflow: 'auto' }}>
        <div className="top-right-section">
          <div className="blue-box">
            <input type="text" placeholder="Search..." onChange={handleSearch} />
          </div>
          <h1>Hello Admin</h1>
          <hr />
        </div>
        <section className="recent padding">
          <div className="container">
            {filteredSoundServices.map((service) => (
            <center>  <div className="service-item"  style={{marginBottom:'30px'}}  key={service._id}>
                <h3>{service.name}</h3>
                <img src={`./images/event/${service.image}`} alt={service.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                <p>{service.details}</p>
                <button onClick={() => handleDelete(service._id)}>Delete</button>
                <hr></hr>
              </div></center>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminShowServices;
