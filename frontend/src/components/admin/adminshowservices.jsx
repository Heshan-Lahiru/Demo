import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminhome.css';

const AdminShowServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getServices');
      setServices(response.data);
      setFilteredServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.trim().toLowerCase());
  };

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(trimmedSearchTerm)
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:3001/deleteService/${serviceId}`);
      // After successful deletion, fetch services again to update the list
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

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
            <div className="content grid3 mtop">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <div className="box shadow" key={service._id}>
                    <div className="img">
                      <img
                        style={{ height: '400px' }}
                        src={`./images/event/${service.image}`}
                        alt=""
                      />
                    </div>
                    <div className="text">
                      <h4>{service.name}</h4>
                      <p>{service.details}</p>
                    </div>
                    <div className="button flex">
                      <div>
                        <button
                          style={{ backgroundColor: '#E00947' }}
                          className="btn2"
                          onClick={() => handleDelete(service._id)}
                        >
                          Delete
                        </button>
                      </div>
                      {/* Update button can be added here */}
                    </div>
                  </div>
                ))
              ) : (
                <p>No services found for your search.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminShowServices;
