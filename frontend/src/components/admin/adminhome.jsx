import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminhome.css';

const Adminhome = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [expandedItemId, setExpandedItemId] = useState(null);

  useEffect(() => {
    const userId = getCookie('userId');
    if (userId !== '6642bb495838288def6d908d') {
      window.location.href = '/login'; // Redirect to login page if userId is not the specific value
    } else {
      fetchUsers();
    }
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3001/getUsers')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch(err => console.log(err));
  };

  const toggleDetails = (userId) => {
    if (expandedItemId === userId) {
      setExpandedItemId(null);
    } else {
      setExpandedItemId(userId);
    }
  };

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:3001/deleteUser/${userId}`)
      .then(() => {
        fetchUsers();
      })
      .catch(err => console.log(err));
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = users.filter(user => user.name.toLowerCase().includes(searchTerm));
    setFilteredUsers(filtered);
  };

  const handleLogout = () => {
    // Clear user session, e.g., by removing the cookie
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect to the login page
    window.location.href = '/login';
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
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
            <input type="text" placeholder="Search by name..." onChange={handleSearch} />
            <hr></hr>
            <button style={{ marginTop: '15px' }} onClick={handleLogout}>Log out</button>
          </div>
          <h1 style={{ color: 'blue' }}>Hello Admin</h1>
          <h1>Registered Users</h1>
          <hr />
        </div>
        <div className="right-side">
          <table>
            <thead>
              <tr>
                <th style={{ backgroundColor: 'white', width: '80px' }}>ID</th>
                <th style={{ backgroundColor: 'white', width: '450px' }}>Name</th>
                <th style={{ backgroundColor: 'white', width: '80px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <button style={{ backgroundColor: '#E00947' }} className='btn2' onClick={() => handleDelete(user._id)}>Delete</button>
                    </td>
                    <td>
                      <img
                        src={expandedItemId === user._id ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxMlTKPiTQ5B1Ph2IbhR4lolhFmgUhk2sgp-xQNVmOvg&s' : 'https://cdn.iconscout.com/icon/free/png-256/down-keyboard-arrow-key-direction-30469.png'}
                        alt={expandedItemId === user._id ? 'Hide Details' : 'Show Details'}
                        onClick={() => toggleDetails(user._id)}
                        style={{ cursor: 'pointer', width: '30px' }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No users found for your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adminhome;
