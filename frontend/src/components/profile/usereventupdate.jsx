import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Add this line to import Cookies module

function Usereventupdate() {
  const { id } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState({
    image: null,
    category: "",
    eventName: "",
    location: "",
    price: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/getEvents/${id}`)
      .then(response => setEvent(response.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setEvent(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", event.image);
    formData.append("category", event.category);
    formData.append("eventName", event.eventName);
    formData.append("location", event.location);
    formData.append("price", event.price);

    try {
      const response = await axios.put(`http://localhost:3001/updateEvent/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data);
      history.push("/ownerevents");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove('userId');
    Cookies.remove('userName');
    Cookies.remove('userEmail');

    // Redirect to login page
    history.push("/login");
  };

  return (
    <div className="admin-panel">
      <div className="left-panel">
        {/* Navigation buttons */}
        <button><a style={{color:'white'}} href='/profile'>Profile</a></button>
            <button><a style={{color:'white'}} href='/eventadd'>Add Events</a></button>
            <button><a style={{color:'white'}} href='/servicesadd'>Add Services</a></button>
                <button><a style={{color:'white'}} href='/ownerevents'>My Events</a></button>
                <button><a  style={{color:'white'}}href='/ownerservices'>My Services</a></button>
                <button><a style={{color:'white'}} href='/userhelp'>Help</a></button>
                <button onClick={handleLogout}>Log out</button>    </div>
   
      <div className="right-panel" style={{ flexGrow: 1, overflow: 'auto' }}>
        {/* Update form */}
        <div className="top-right-section">
          <div className="blue-box">
            <input type="text" placeholder="Search..." />
          </div>
          <h2>Update Event</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Image:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </div>
            <div>
              <label>Category:</label>
              <input type="text" name="category" value={event.category} onChange={handleChange} />
            </div>
            <div>
              <label>Event Name:</label>
              <input type="text" name="eventName" value={event.eventName} onChange={handleChange} />
            </div>
            <div>
              <label>Location:</label>
              <input type="text" name="location" value={event.location} onChange={handleChange} />
            </div>
            <div>
              <label>Price:</label>
              <input type="text" name="price" value={event.price} onChange={handleChange} />
            </div>
            <button type="submit">Update Event</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Usereventupdate;
