import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "./eventadd.css";

const Rate = () => {
  const [formData, setFormData] = useState({
    image: null,
    eventName: '',
    stars: 0
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', formData.image);
      formDataToSend.append('eventName', formData.eventName);
      formDataToSend.append('stars', formData.stars);

      await axios.post('http://localhost:3001/addRating', formDataToSend); // Assuming you have an endpoint to handle this on the backend
      // Redirect to a success page or do something else
      history.push('/profile');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="ev">
      <div className="left-panel">
        <button><a style={{color:'white'}} href='/profile'>Profile</a></button>
        <button><a style={{color:'white'}} href='/eventadd'>Add Events</a></button>
        <button><a style={{color:'white'}} href='/servicesadd'>Add Services</a></button>
        <button><a style={{color:'white'}} href='/ownerevents'>My Events</a></button>
        <button><a style={{color:'white'}} href='/ownerservices'>My Services</a></button>
        <button><a style={{color:'white'}} href='/userhelp'>Help</a></button>
        <button>Log out</button>
      </div>
      <div className="right">
        <form className="formclass" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="image">Your Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              required
            />
          </div>
          <div>
            <label htmlFor="eventName">Comment:</label>
            <input
              style={{ width: '400px' }}
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="stars">Stars:</label>
            <input
              style={{ width: '400px' }}
              type="number"
              id="stars"
              name="stars"
              value={formData.stars}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            style={{ backgroundColor: '#E00947', marginTop: '40px', marginBottom: '40px' }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rate;