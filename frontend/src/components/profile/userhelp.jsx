import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./eventadd.css";

const UserHelp = () => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const storedUserId = Cookies.get('userId');
    if (!storedUserId) {
      setRedirect(true);
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
  const history = useHistory();
  if (redirect) {
    history.push('/login');
    // Refresh the page
    window.location.reload();
    return null;
  }
  return (
    <div className="ev">
      <div className="left-panel">
        <button><a style={{color:'white'}} href='/profile'>Profile</a></button>
        <button><a style={{color:'white'}} href='/eventadd'>Add Events</a></button>
        <button><a style={{color:'white'}} href='/servicesadd'>Add Services</a></button>
        <button><a style={{color:'white'}} href='/ownerevents'>My Events</a></button>
        <button><a style={{color:'white'}} href='/ownerservices'>My Services</a></button>
        <button><a style={{color:'white'}} href='/userhelp'>Help</a></button>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <div className="right">
<div style={{display:'grid'}}>
  <div style={{marginBottom:'200px',marginLeft:'50px'}}>
      <center> <p >
        Using our website is simple and intuitive. 
        Start by navigating to the homepage, where 
        you'll find a menu with various options such as 
        "Home," "About Us," "Services," and "Contact." To 
        explore our offerings, click on the "Services" tab,   
        which provides detailed information about each service 
        we offer. If you need assistance or wish to get in touch,
         visit the "Contact" page and fill out the form with your
          details and inquiry. For more personalized features, consider 
          creating an account by clicking on the "Sign Up" button and
           following the prompts. Enjoy a seamless browsing experience
            designed to meet all your needs.
        </p></center> 
        </div>
        <div style={{display:'flex',gap:'30px',marginLeft:'620px'}}>
          <button style={{backgroundColor:'#E00947'}}>FAQ</button>
          <button style={{backgroundColor:'#E00947'}}>Contact Support</button>
          <button style={{backgroundColor:'#E00947'}}>Report Issue</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserHelp;
