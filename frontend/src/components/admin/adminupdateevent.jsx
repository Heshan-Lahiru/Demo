import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

function Update() {
  const { id } = useParams();
  const history = useHistory();  // Use history for redirection
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
      history.push("/adminshowevent");  // Redirect after successful update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-panel">
      <div className="left-panel">
        <button><a style={{ color: 'white' }} href='/adminhome'>Users</a></button>
        <button><a style={{ color: 'white' }} href='/adminticket'>Ticket Booking</a></button>
        <button><a style={{ color: 'white' }} href='/adminservices'>Services</a></button>
        <button><a style={{ color: 'white' }} href='/adminshowevent'>Events</a></button>
        <button><a style={{ color: 'white' }} href='/adminhelp'>Help</a></button>
      </div>
      <div className="right-panel" style={{ flexGrow: 1, overflow: 'auto' }}>
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

export default Update;
