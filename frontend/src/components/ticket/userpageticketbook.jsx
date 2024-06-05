import React, { useState } from 'react';
import axios from 'axios';
import "./userpageticket.css";

const Userpageticketbook = ({ location }) => {
  const { price, image, location: eventLocation, category } = location.state || {};
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [paymentError, setPaymentError] = useState(null);

  const handlePayment = async () => {
    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      setPaymentError("Mobile number must be exactly 10 digits.");
      return;
    }
    if (/[^a-zA-Z\s]/.test(name)) {
      setPaymentError("Name cannot contain special characters.");
      return;
    }
    if (!/^\d{3}-\d{3}-\d{3}-\d{3}$/.test(accNumber)) {
      setPaymentError("Account number must be in the format 123-123-123-123.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/payment', {
        name,
        mobileNumber,
        accNumber,
      });
      console.log(response.data);
      alert("Successful payment");

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
            </label>
            <label htmlFor="acc">Acc No:</label>
            <input 
              type="text" 
              id="acc" 
              name="acc" 
              required 
              value={accNumber}
              onChange={(e) => setAccNumber(e.target.value)}
              placeholder="123-123-123-123"
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
              required 
              value={mobileNumber} 
              onChange={(e) => setMobileNumber(e.target.value)} 
              placeholder="0771111111"
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
