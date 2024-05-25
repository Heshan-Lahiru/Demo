import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Adminpostshow = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`http://localhost:3001/images/${imageId}`);
      // Remove the deleted image from the state
      setImages(images.filter(image => image._id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
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
            <input type="text" placeholder="Search..." />
          </div>
          <h1>Show Post</h1>
          <hr />
        </div>

       
        <div style={{marginLeft:'40%'}} className="image-gallery">
          {images.map((image, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <img style={{ width: '300px',marginBottom:'40px' }} src={`./images/event/${image.filename}`} alt={`Image ${index}`} />
              <button style={{ marginLeft: '10px',backgroundColor:'#E00947' }} onClick={() => handleDelete(image._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adminpostshow;
