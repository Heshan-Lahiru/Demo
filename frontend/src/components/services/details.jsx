import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './details.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const Details = () => {
  const [soundServices, setSoundServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSoundServices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getSoundServices'); // Replace with your actual endpoint
        setSoundServices(response.data);
      } catch (error) {
        console.error('Error fetching sound services:', error);
      }
    };

    fetchSoundServices();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredServices = soundServices.filter((soundService) =>
    soundService.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="show-sounds-s">
      <img style={{ width: '100%', height: '500px' }} src="https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg" alt="Nature" className="image" />
      <h1 style={{ marginTop: '100px', marginBottom: '100px' }}>
        <i> Services</i> <input style={{ marginLeft: '50px', backgroundColor: 'silver',borderRadius:'50px' }} type='text' placeholder='Search by location' onChange={handleSearch} />
      </h1>
      <div className="sound-cards">
        {filteredServices.map((soundService) => (
          <div className="sound-card" key={soundService._id}>
            <img src={`../images/event/${soundService.image}`} alt={soundService.name} />
            <h3>{soundService.name}</h3>
            <p>{soundService.location}</p>
            <p>Price: LKR{soundService.price}/=</p>
            <button style={{ backgroundColor: '#E00947', color: 'white' }} className='btn2'>
                          <Link 
                            style={{ color: 'white' }} 
                            to={{
                              pathname: `/userpageticketbook`,
                              state: { 
                                price: soundService.price,
                                image: soundService.image ,
                                location:soundService.location,
                                category:soundService.name,
                                userId:soundService.userId
                              }
                            }}
                          >
                         Book Now
                          </Link>
                        </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
