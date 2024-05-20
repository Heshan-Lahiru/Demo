import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './details.css'; // Import your CSS file

const Details = () => {
  const [soundServices, setSoundServices] = useState([]);

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

  return (
    <div className="show-sounds-s">
              <img style={{width:'100%', height:'500px'}} src="https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg" alt="Nature" className="image" />
              <h1 style={{marginTop:'100px', marginBottom:'100px'}}><i>All Services</i></h1>
      <div className="sound-cards">
        {soundServices.map((soundService) => (
          <div className="sound-card" key={soundService._id}>
            <img src={`../images/event/${soundService.image}`} alt={soundService.name} />
            <h3>{soundService.name}</h3>
            <p>{soundService.location}</p>
            <p>Price: LKR{soundService.price}/=</p>
            <button style={{backgroundColor:'#E00947'}}>Book Now</button>
            {/* Add a button for user interaction if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
