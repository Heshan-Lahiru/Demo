import React from 'react';
import './adminhome.css';

const Adminhelp = () => {
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
          <div className="help-content">
            <h2>This is the Help Page</h2>
            <p>Here you can find information and resources to assist you with using the admin panel effectively. Explore the different sections for detailed guidance on managing users, tickets, services, events, and more.</p>
          </div>
          <div style={{marginTop:'100px'}} className="image-button-a">
           
        <center> <a href='/post'   ><img style={{width:'100px'}} src="https://img.freepik.com/premium-vector/add-post-icon-line-icon_707519-2569.jpg" alt="Help Button" /></a>
              <p style={{marginBottom:'100px'}}>Click for Add Post</p>
            
              <a href='/adminpostshow'   ><img style={{width:'100px'}} src="https://logowik.com/content/uploads/images/post1826.logowik.com.webp" alt="Help Button" /></a>
              <p style={{marginBottom:'100px'}}>Click for Show Post</p>

           <a href=''   ><img style={{width:'100px'}} src="https://cdn4.iconfinder.com/data/icons/miu-square-flat-social/60/whatsapp-square-social-media-512.png" alt="Help Button" /></a>
              <p>Click for Help</p>
              </center> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminhelp;
