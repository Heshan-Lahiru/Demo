import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./eventadd.css";

const Servicesadd = () => {
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
      <div className="left-panel" >
      <button><a style={{color:'white'}} href='/profile'>Profile</a></button>
            <button><a style={{color:'white'}} href='/eventadd'>Add Events</a></button>
            <button><a style={{color:'white'}} href='/servicesadd'>Add Services</a></button>
                <button><a style={{color:'white'}} href='/ownerevents'>My Events</a></button>
                <button><a  style={{color:'white'}}href='/ownerservices'>My Services</a></button>
                <button><a style={{color:'white'}} href='/userhelp'>Help</a></button>
                <button onClick={handleLogout}>Log out</button>      </div>
      <div className="right">


      
         
      
      
      
      </div>
    </div>
  );
};

export default Servicesadd;
