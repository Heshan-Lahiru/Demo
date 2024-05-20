import React from 'react';
import './adminhome.css';

const Adminticket = () => {
 
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
            <input type="text" placeholder="Search..." />
          </div>
          <h1>Hello Admin</h1>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Adminticket
