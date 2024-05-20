import React, { useEffect, useState } from 'react';
import {   useHistory} from 'react-router-dom';
import Cookies from 'js-cookie';
import './profile.css';

const Profile = () => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const storedUserId = Cookies.get('userId');
        const storedUserName = Cookies.get('userName');
        const storedUserEmail = Cookies.get('userEmail');

        if (!storedUserId) {
            setRedirect(true);
        } else {
            setUserId(storedUserId);
            setUserName(storedUserName);
            setUserEmail(storedUserEmail);
        }
    }, []);

    const handleLogout = () => {
        // Remove cookies
        Cookies.remove('userId');
        Cookies.remove('userName');
        Cookies.remove('userEmail');
        // Redirect to login page
        setRedirect(true);
    };

    if (redirect) {
        history.push('/login');
    // Refresh the page
    window.location.reload();
    return null;
    }

    return (
        <div className="admin-panel">
            <div className="left-panel">
            <button><a style={{color:'white'}} href='/profile'>Profile</a></button>
            <button><a style={{color:'white'}} href='/eventadd'>Add Events</a></button>
            <button><a style={{color:'white'}} href='/servicesadd'>Add Services</a></button>
                <button><a style={{color:'white'}} href='/ownerevents'>My Events</a></button>
                <button><a  style={{color:'white'}}href='/ownerservices'>My Services</a></button>
                <button><a style={{color:'white'}} href='/userhelp'>Help</a></button>
                <button onClick={handleLogout}>Log out</button>
            </div>
            <div className="right-panel">
                <div className="details">
                    <h1>Hello, {userName}</h1>
                   
                    <p>Your Name: {userName}</p>
                    <p>Your Email: {userEmail}</p>
                </div>
                <div className="logo12">
                    <img className="profile-logo" src="https://i.pinimg.com/originals/9f/9e/0c/9f9e0ca9207312ce6e89196b2358c809.gif" alt="Logo" />
                </div>
            </div>
        </div>
    );
}

export default Profile;
