import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'; // Import Cookies from 'js-cookie'

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Get user ID from cookie
    const userId = Cookies.get('userId');

    // Make API call to fetch user's cart items
    axios.get(`http://localhost:3001/getUserCart/${userId}`)
      .then(response => {
        setCartItems(response.data);
      })
      .catch(err => {
        console.error("Error fetching user's cart items:", err);
      });
  }, []);

  useEffect(() => {
    // Fetch event details for each event ID in cartItems
    const fetchEventDetails = async () => {
      const eventDetails = await Promise.all(cartItems.map(async cartItem => {
        try {
          const response = await axios.get(`http://localhost:3001/getEventDetails/${cartItem.eventId}`);
          return response.data;
        } catch (error) {
          console.error("Error fetching event details:", error);
          return null;
        }
      }));
      setCartItems(prevCartItems => prevCartItems.map((cartItem, index) => ({
        ...cartItem,
        eventDetails: eventDetails[index]
      })));
    };

    fetchEventDetails();
  }, [cartItems]);

  const removeFromCart = (itemId) => {
    // Make API call to remove item from cart
    axios.delete(`http://localhost:3001/removeFromCart/${itemId}`)
      .then(response => {
        // If removal is successful, update cartItems state to remove the item
        setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== itemId));
        console.log("Item removed from cart:", itemId);
      })
      .catch(err => {
        console.error("Error removing item from cart:", err);
      });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <center><div  className="card-contain">
        {cartItems.map(cartItem => (
          <div style={{width:'900px',marginBottom:'100px' }} key={cartItem._id} className="card">
            {cartItem.eventDetails && (
              <>
                <img style={{width:'20%'}} src={`./images/event/${cartItem.eventDetails.image}`} alt="Event" />
                <div className="card-details">
                  <p>Event Name: {cartItem.eventDetails.eventName}</p>
                  <p>Location: {cartItem.eventDetails.location}</p>
                  <p>Price: {cartItem.eventDetails.price}</p>
                  <p>Quantity: {cartItem.quantity}</p>
                </div>
                <button style={{backgroundColor:'white', color:'red'}} onClick={() => removeFromCart(cartItem._id)}>Remove from Cart</button>
              </>
            )}
          </div>
        ))}
      </div></center>
    </div>
  );
}

export default CartPage;
