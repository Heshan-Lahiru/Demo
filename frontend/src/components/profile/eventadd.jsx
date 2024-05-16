import React, { useState } from 'react';
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

  return (
    <div className="container">
      <div className="left">
        <h2>Fill Form For Add Event</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
            {categoryError && <p className="error">{categoryError}</p>}
          </div>
          <div>
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
            />
            {eventNameError && <p className="error">{eventNameError}</p>}
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input
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
              type="text"
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
      <div className="right">
        <img src="https://cdn.dribbble.com/users/424937/screenshots/6660260/01-account-created-dribbble.gif" alt="" />
      </div>
    </div>
  );
};

export default Eventadd;
