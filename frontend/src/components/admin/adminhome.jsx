import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminhome.css';

const Adminhome = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [expandedItemId, setExpandedItemId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3001/getUsers')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initially set filtered users to all users
      })
      .catch(err => console.log(err));
  };

  const toggleDetails = (userId) => {
    if (expandedItemId === userId) {
      setExpandedItemId(null); // Collapse details if already expanded
    } else {
      setExpandedItemId(userId); // Expand details for the clicked user
    }
  };

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:3001/deleteUser/${userId}`)
      .then(() => {
        // Update the users list after successful deletion
        fetchUsers();
      })
      .catch(err => console.log(err));
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase(); // Convert search term to lowercase for case-insensitive matching
    const filtered = users.filter(user => user.name.toLowerCase().includes(searchTerm)); // Filter users based on case-insensitive search
    setFilteredUsers(filtered);
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
      <div className="right-panel"  style={{ flexGrow: 1, overflow: 'auto'  }}>
        <div className="top-right-section">
          <div className="blue-box">
            <input type="text" placeholder="Search by name..." onChange={handleSearch} />
          </div>
          <h1>Hello Admin</h1>
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
              {filteredUsers.length > 0 ? ( // Display filtered users if there are any
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
              ) : ( // Display a message if no users match the search
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

export default Adminhome
