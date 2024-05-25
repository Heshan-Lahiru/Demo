import React, { useState } from 'react';
import axios from 'axios';
import "./userpageticket.css";

const Userpageticketbook = ({ location }) => {
  const { price, image, location: eventLocation, category } = location.state || {};
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [paymentError, setPaymentError] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/payment', {
        name,
        mobileNumber,
      });
      console.log(response.data); 
      alert("successful payment");

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = 400; 
      canvas.height = 400; 

      const img = new Image();
      img.crossOrigin = "anonymous"; 
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 200, 400); 

        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(`Price: LKR ${price}/=`, 10, 30);
        ctx.fillText(`Location: ${eventLocation}`, 10, 60);
        ctx.fillText(`Date: ${category}`, 10, 90);

        const imageURL = canvas.toDataURL("image/png");

        const link = document.createElement('a');
        link.href = imageURL;
        link.download = image; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      img.src = `./images/event/${image}`;
    } catch (error) {
      setPaymentError(error.message); 
    }
  };

  return (
    <div className="box-xa">
      <div className="boxes">
        <div className="right-side">
          <img src={`./images/event/${image}`} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="left-side">
          <div className="blur-background">
            <label>
              {price ? `Price: LKR ${price}/=` : "No price available"}<br />
              {eventLocation ? `Location: ${eventLocation}` : "No location available"}<br />
              {category ? `Date: ${category}` : "No category available"}<br />
             {/* {userId ? ` ${userId}` : "No userId available"} */}
            </label>
            <label htmlFor="acc">Acc No:</label>
            <input 
              type="text" 
              id="acc" 
              name="acc" 
              required 
             
            />
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />

            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input 
              type="tel" 
              id="mobileNumber" 
              name="mobileNumber" 
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" 
              required 
              value={mobileNumber} 
              onChange={(e) => setMobileNumber(e.target.value)} 
            />

            <button style={{ backgroundColor: '#E00947' }} type="button" onClick={handlePayment}>Pay</button>
            {paymentError && <p>{paymentError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userpageticketbook;
