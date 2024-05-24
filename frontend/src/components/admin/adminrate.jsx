import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminhome.css';

const Adminhelp = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    // Fetch ratings data from backend when component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getratings');
        setRatings(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteRating/${id}`);
      // After deletion, refetch the ratings data to update the table
      const response = await axios.get('http://localhost:3001/getratings');
      setRatings(response.data);
    } catch (error) {
      console.error('Error deleting rating:', error);
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
          <h1>Hello Admin</h1>
          <hr />
          <div>
            <h2>Rating Details</h2>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Event Name</th>
                  <th>Stars</th>
                  <th>Action</th> {/* New column for delete button */}
                </tr>
              </thead>
              <tbody>
                {ratings.map(rating => (
                  <tr key={rating._id}>
                    <td><img src={`./images/event/${rating.image}`} alt="Rating Image" style={{ width: '100px', height: '100px' }} /></td>
                    <td>{rating.eventName}</td>
                    <td>{rating.stars}</td>
                    <td>
                      <button style={{backgroundColor:'#E00947'}} onClick={() => handleDelete(rating._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminhelp;
