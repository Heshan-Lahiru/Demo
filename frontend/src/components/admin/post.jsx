import React, { useState } from 'react';
import axios from 'axios';
import './adminhome.css';

const Adminhelp = () => {
  const [image, setImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploadMessage('');

    if (!image) {
      setUploadMessage('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3001/uploadpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setUploadMessage('Image uploaded successfully!');
        setImage(null); // Reset the image input
      } else {
        setUploadMessage(`Failed to upload image. Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="admin-panel">
      <div className="left-panel">
        <button><a style={{ color: 'white' }} href='/adminhome'>Users</a></button>
        <button><a style={{ color: 'white' }} href='/adminticket'>Ticket Booking</a></button>
        <button><a style={{ color: 'white' }} href='/adminservices'>Services</a></button>
        <button><a style={{ color: 'white' }} href='/adminshowservices'>Show Services</a></button>
        <button><a style={{ color: 'white' }} href='/adminshowevent'>Events</a></button>
        <button><a style={{ color: 'white' }} href='/adminhelp'>Help</a></button>
      </div>
      <div className="right-panel" style={{ flexGrow: 1, overflow: 'auto' }}>
        <div className="top-right-section">
          <div className="blue-box">
            <input type="text" placeholder="Search..." />
          </div>
          <h1>Add Post</h1>
          <hr />
        </div>
        <center>
          <form className="formclass" onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
              />
            </div>
            <button style={{ backgroundColor: '#E00947', marginTop: '40px', marginBottom: '40px' }} type="submit">
              Submit
            </button>
            {uploadMessage && <p>{uploadMessage}</p>}
          </form>
        </center>
      </div>
    </div>
  );
};

export default Adminhelp;
