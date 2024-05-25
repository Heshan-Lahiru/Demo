// Adminticket.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminhome.css';

const Adminticket = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch ticket booking data from backend when component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/gettickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Function to handle delete ticket
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteTicket/${id}`);
      // After deletion, fetch the updated ticket list
      const response = await axios.get('http://localhost:3001/gettickets');
      setTickets(response.data);
    } catch (error) {
      console.error('Error deleting ticket:', error);
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
          <h1>Hello Admin</h1>
          <hr />
        </div>
        <div className="table-container">
          <h2>Ticket Booking Details</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket._id}>
                  <td>{ticket.name}</td>
                  <td>{ticket.mobileNumber}</td>
                  <td>
                   
                    <button style={{backgroundColor:'#E00947'}} onClick={() => handleDelete(ticket._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adminticket;
