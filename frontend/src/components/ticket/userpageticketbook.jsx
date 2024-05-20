import React from 'react';
import { useLocation } from 'react-router-dom';
import "./userpageticket.css";

const Userpageticketbook = () => {
  const location = useLocation();
  const { price } = location.state || {}; // Destructure price from location.state

  return (
    <div className="box-xa">
      <div className="boxes">
        <div className="left-side">
          <h1 style={{marginTop:'100px',marginLeft:'100px',color:'#E00947'}}>{price ? `Price: LKR ${price}/=` : "No price available"}</h1> {/* Display the price */}
        </div>
        <div className="right-side">
          <label htmlFor="accountNumber">Account Number:</label>
          <input type="text" id="accountNumber" name="accountNumber" />

          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input type="text" id="mobileNumber" name="mobileNumber" />

          <button style={{ backgroundColor:'#E00947' }} type="submit">Pay</button>
        </div>
      </div>
    </div>
  );
};

export default Userpageticketbook;
