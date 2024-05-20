import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory, useParams } from 'react-router-dom';
import "./eventadd.css";
const Sounds = () => {
  const { serviceID } = useParams(); // Retrieve serviceID from URL
  const [userID, setUserID] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: ''
  });
  const [file, setFile] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const storedUserID = Cookies.get('userId');

    if (!storedUserID) {
      // Redirect to login page if userID is not found in cookies
      history.push('/login');
    } else {
      setUserID(storedUserID);
    }
  }, [history]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append('name', formData.name);
      formDataWithFile.append('location', formData.location);
      formDataWithFile.append('price', formData.price);
      formDataWithFile.append('image', file);
      formDataWithFile.append('userID', userID);
      formDataWithFile.append('serviceID', serviceID); // Append serviceID to the form data

      const response = await axios.post('http://localhost:3001/addSoundService', formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Sound service added:', response.data);
      // Reset form fields after successful submission
      setFormData({
        name: '',
        location: '',
        price: ''
      });
      setFile(null);
    } catch (error) {
      console.error('Error adding sound service:', error);
    }
  };

  return (
    <div className="ev">
       <div className="left-panel" >
      <button><a style={{color:'white'}} href='/profile'>Profile</a></button>
            <button><a style={{color:'white'}} href='/eventadd'>Add Events</a></button>
            <button><a style={{color:'white'}} href='/servicesadd'>Add Services</a></button>
                <button><a style={{color:'white'}} href='/ownerevents'>My Events</a></button>
                <button><a  style={{color:'white'}}href='/ownerservices'>My Services</a></button>
                <button><a style={{color:'white'}} href='/userhelp'>Help</a></button>
                <button>Log out</button>
             </div>

             <div className="right">
      <form  class="formclass" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default Sounds;
