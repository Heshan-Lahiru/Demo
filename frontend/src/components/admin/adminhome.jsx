// AdminPanel.js
import React from 'react';
import './adminhome.css';

const AdminPanel = () => {
    return (
        <div className="admin-panel">
            <div className="left-panel">
                <button>Users</button>
                <button>Ticket boking</button>
                <button>Services</button>
                <button><a style={{color:'white'}} href='/adminshowevent'>Events</a></button>
                <button>Help</button>
            </div>
            <div className="right-panel">
                <div className="details">
                    <h1>Admin</h1>
                    <p>Name: Admin</p>
                    <p>Email: johndoe@example.com</p>
                </div>
                <div className="logoad">
                    <img style={{marginLeft:'200px', marginTop:'100px'}} src="https://i.pinimg.com/originals/9f/9e/0c/9f9e0ca9207312ce6e89196b2358c809.gif" alt="Logo" />
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
