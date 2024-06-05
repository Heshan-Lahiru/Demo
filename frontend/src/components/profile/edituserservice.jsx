import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditSoundService = () => {
  const { serviceId } = useParams();
  const history = useHistory();
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    image: null
  });

  useEffect(() => {
    fetchSoundService();
  }, []);

  const fetchSoundService = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getSoundService/${serviceId}`);
      const { name, location, price } = response.data;
      setFormData({ name, location, price });
    } catch (error) {
      console.error('Error fetching sound service:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      let value = e.target.value;
      if (e.target.name === 'name') {
        value = value.replace(/[0-9@#$%]/g, '');
      }
      setFormData({ ...formData, [e.target.name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append('name', formData.name);
      formDataWithFile.append('location', formData.location);
      formDataWithFile.append('price', formData.price);
      formDataWithFile.append('image', formData.image);

      await axios.put(`http://localhost:3001/updateSoundService/${serviceId}`, formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Redirect to the owner services page after successful update
      history.push('/ownerservices');
    } catch (error) {
      console.error('Error updating sound service:', error);
    }
  };

  return (
    <div>
      <h2>Edit Sound Service</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          
          required
        />
       <select style={{width:'100%',height:'40px'}}
  name="location"
  value={formData.location}
  onChange={handleChange}
  required
>
  <option value="">Select Location</option>
  <option value="Colombo">Colombo</option>
  <option value="Kandy">Kandy</option>
  <option value="Galle">Galle</option>
  <option value="Matara">Matara</option>
  <option value="Jaffna">Jaffna</option>
  <option value="Negombo">Negombo</option>
  <option value="Anuradhapura">Anuradhapura</option>
  <option value="Polonnaruwa">Polonnaruwa</option>
  <option value="Trincomalee">Trincomalee</option>
  {/* Add more options for other Sri Lankan cities */}
</select>


        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditSoundService;
