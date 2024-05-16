import React from "react";

import './profile.css';

const Profile = () => {
    return (
        <div className="admin-panel">
            <div className="left-panel">
            <button><a style={{color:'white'}} href='/eventadd'>Add Events</a></button>
                <button>Ticket boking</button>
                <button>Services</button>
                <button><a style={{color:'white'}} href='/adminshowevent'>Events</a></button>
                <button><a style={{color:'white'}} href='/help'>Help</a></button>
            </div>
            <div className="right-panel">
                <div className="details">
                    <h1>User</h1>
                    <p>Name: User</p>
                    <p>Email: johndoe@example.com</p>
                </div>
                <div className="logo12">
                    <img style={{marginLeft:'200px', marginTop:'100px'}} src="https://i.pinimg.com/originals/9f/9e/0c/9f9e0ca9207312ce6e89196b2358c809.gif" alt="Logo" />
                </div>
            </div>
        </div>
    );
}

export default Profile;
