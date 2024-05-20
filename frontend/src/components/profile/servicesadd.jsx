import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../admin/adminhome.css';

const Serviceadd = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

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

  const handleLogout = () => {
    // Your logout logic here
    console.log('User logged out');
  };

  return (
    <div className="admin-panel">
      <div className="left-panel">
        <button><a style={{color:'white'}} href='/profile'>Profile</a></button>
        <button><a style={{color:'white'}} href='/eventadd'>Add Events</a></button>
        <button><a style={{color:'white'}} href='/servicesadd'>Add Services</a></button>
        <button><a style={{color:'white'}} href='/ownerevents'>My Events</a></button>
        <button><a  style={{color:'white'}}href='/ownerservices'>My Services</a></button>
        <button><a style={{color:'white'}} href='/userhelp'>Help</a></button>
        <button onClick={handleLogout}>Log out</button>   
      </div>
      <div className="right-panel" style={{ flexGrow: 1, overflow: 'auto' }}>
        <section className="recent padding">
          <div className="container">
            <div className="content grid3 mtop">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <div className="box shadow" key={service._id}>
                    <div className="img">
                      <img
                        style={{ height: '100px', width:'100px' }}
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
                        <button style={{ backgroundColor: '#E00947' }} className="btn2">
                          <Link to={`/sounds/${service._id}`}> {/* Navigate to Sounds component with serviceID */}
                            <span style={{ color: 'white' }}>Add service</span>
                          </Link>
                        </button>
                      </div>
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

export default Serviceadd;
