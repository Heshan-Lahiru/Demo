import React, { useState , useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import "./adminhome.css";

const ServiceAdd = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(""); // State for selected service name
  const [details, setDetails] = useState("");
  const [nameError, setNameError] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const history = useHistory();
  const userId = Cookies.get('userId');

  useEffect(() => {
    // Check if userId is not the specific value, redirect to login
    if (userId !== '6642bb495838288def6d908d') {
      history.push('/login');
    }
  }, [userId, history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isValidName(name)) {
        setNameError("Please select a service name.");
        return;
      } else {
        setNameError("");
      }

      if (!isValidDetails(details)) {
        setDetailsError("Details cannot be empty.");
        return;
      } else {
        setDetailsError("");
      }

      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('details', details);
      formData.append('userId', userId); 

      const response = await axios.post('http://localhost:3001/servicesadd', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        alert("Service added successfully!");
        setName("");
        setDetails("");
        setImage(null);
        setSubmissionError("");
      } else {
        setSubmissionError(`Failed to add service. Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionError("An error occurred. Please try again later.");
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const isValidName = (inputName) => {
    return inputName !== ""; // Check if the selected name is not empty
  };

  const isValidDetails = (inputDetails) => {
    return inputDetails.trim() !== "";
  };

  const handleLogout = () => {
    // Remove cookies
    Cookies.remove('userId');
    Cookies.remove('userName');
    Cookies.remove('userEmail');
    // Redirect to login page
    history.push('/login');
  };

  return (
    <div className="admin-panel" style={{ display: "flex" }}>
      <div className="left-panel">
      <button><a style={{ color: 'white' }} href='/adminhome'>Users</a></button>
          <button><a style={{ color: 'white' }} href='/adminticket'>Ticket Booking</a></button>
          <button><a style={{ color: 'white' }} href='/adminservices'>Services</a></button>
          <button><a style={{ color: 'white' }} href='/adminshowservices'>Show Services</a></button>
          <button><a style={{ color: 'white' }} href='/adminshowevent'>Events</a></button>
          <button><a style={{ color: 'white' }} href='/adminhelp'>Help</a></button>
    </div>
      <div className="right-panel">
      <div className="top-right-section">
          <div className="blue-box">
            <input type="text" placeholder="Search..." />
          </div>
          <h1>Hello Admin</h1>
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
          <div>
            <label htmlFor="name">Service Name:</label><br></br>
            <select
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            >
              <option value="">Select a service name</option>
              <option value="Service">Service</option>
             
            </select>
            {nameError && <p className="error">{nameError}</p>}
          </div>
          <div>
            <label htmlFor="details">Details:</label>
            <input
              type="text"
              id="details"
              name="details"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
            />
            {detailsError && <p className="error">{detailsError}</p>}
          </div>
          <button style={{ backgroundColor: '#E00947', marginTop: '40px', marginBottom: '40px' }} type="submit">
            Submit
          </button>
          {submissionError && <p style={{color:'red'}} className="error">service with the same name already exists</p>}
        </form></center>
      </div>
    </div>
  );
};

export default ServiceAdd;
