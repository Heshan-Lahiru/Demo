import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import "./eventadd.css";

const Eventadd = () => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [eventNameError, setEventNameError] = useState("");
  const [locationError, setLocationError] = useState(""); // State to manage location format error
  const [priceError, setPriceError] = useState(""); // State to manage price format error
  const [submissionError, setSubmissionError] = useState("");
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const userId = Cookies.get('userId');
  useEffect(() => {
    if (!userId) {
      setRedirect(true);
    }
  }, [userId]);

  if (redirect) {
    history.push('/login');
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isValidCategory(category)) {
        setCategoryError("Category format should be date/month/year (e.g., 24/05/2024)");
        return;
      } else {
        setCategoryError("");
      }

      if (!isValidEventName(eventName)) {
        setEventNameError("Invalid event name. Please choose from musical, carnival, festival, party, food festival.");
        return;
      } else {
        setEventNameError("");
      }

      if (!isValidLocation(location)) {
        setLocationError("Invalid location. Please enter a Sri Lankan city.");
        return;
      } else {
        setLocationError("");
      }

      if (!isValidPrice(price)) {
        setPriceError("Invalid price format. Price should be a number with 3 to 5 digits.");
        return;
      } else {
        setPriceError("");
      }

       const formData = new FormData();
      formData.append('image', image);
      formData.append('category', category);
      formData.append('eventName', eventName);
      formData.append('location', location);
      formData.append('price', price);
      formData.append('userId', userId); 

      const response = await axios.post('http://localhost:3001/eventadd', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        alert("Event added successfully!");
        setCategory("");
        setEventName("");
        setLocation("");
        setPrice("");
        setImage(null);
        setSubmissionError("");
      } else {
        setSubmissionError(`Failed to add event. Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionError("An error occurred. Please try again later.");
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const isValidCategory = (inputCategory) => {
    const categoryRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return categoryRegex.test(inputCategory);
  };

  const isValidEventName = (inputEventName) => {
    const eventNameRegex = /^(musical|carnival|festival|party|food festival)$/i;
    return eventNameRegex.test(inputEventName);
  };

  const isValidLocation = (inputLocation) => {
    // List of Sri Lankan cities (add more if needed)
    const cities = ["colombo", "gampaha", "kandy", "negombo", "jaffna", "kalmunai", "galle", "trincomalee", "batticaloa", "kurunegala", "kegalle", "ratnapura", "badulla", "anuradhapura", "matara", "puttalam", "nuwara eliya", "balangoda", "chilaw", "kattankudy"];
    return cities.includes(inputLocation.toLowerCase());
  };

  const isValidPrice = (inputPrice) => {
    const priceRegex = /^\d{3,5}$/;
    return priceRegex.test(inputPrice);
  };
  const handleLogout = () => {
    // Remove cookies
    Cookies.remove('userId');
    Cookies.remove('userName');
    Cookies.remove('userEmail');
    // Redirect to login page
    setRedirect(true);
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
                <button onClick={handleLogout}>Log out</button>
             </div>
      <div className="right">


      
        <form class="formclass" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
          <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              
            />
           
          </div>
          <div>
            <label htmlFor="category">Date:</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder='DD/MM/YYYY'
              style={{width:'400px'}}
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
            {categoryError && <p className="error">{categoryError}</p>}
          </div>
          <div>
            <label htmlFor="eventName">Event Name:</label>
            <label style={{fontSize:'0.9rem'}}>musical | carnival | festival | party | food festival</label>

            <input
             style={{width:'400px'}}
              type="text"
              id="eventName"
              name="eventName"
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
            />
            {eventNameError && <p className="error">{eventNameError}</p>}
          </div>
          <div>
            <label htmlFor="location">Location (Cities only):</label>
            <input
             style={{width:'400px'}}
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
            {locationError && <p className="error">{locationError}</p>}
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
             style={{width:'400px'}}
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            {priceError && <p className="error">{priceError}</p>}
          </div>
          <button style={{ backgroundColor: '#E00947', marginTop: '40px', marginBottom: '40px' }} type="submit">
            Submit
          </button>
          {submissionError && <p className="error">{submissionError}</p>}
        </form>      
      
      
      
      </div>
    </div>
  );
};

export default Eventadd;
