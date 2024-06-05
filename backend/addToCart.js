const express = require('express');
const router = express.Router();

const CartItem = require('./models/CartItem');

router.post('/addToCart', async (req, res) => {
    try {
        const { userId, eventId } = req.body;
    
        const CartItem = require('./models/CartItem');
    
        const existingCartItem = await CartItem.findOne({ userId, eventId });
    
        if (existingCartItem) {
          existingCartItem.quantity += 1;
          await existingCartItem.save();
          res.status(200).json({ message: 'Item quantity updated in cart' });
        } else {
          const newCartItem = new CartItem({ userId, eventId });
          await newCartItem.save();
          res.status(201).json({ message: 'Item added to cart successfully' });
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    router.get('/getUserCart/:userId', async (req, res) => {
        try {
          const { userId } = req.params;
          const userCartEvents = await CartItem.find({ userId });
          res.status(200).json(userCartEvents);
        } catch (error) {
          console.error('Error fetching user cart events:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

router.delete('/removeFromCart/:itemId', async (req, res) => {
    try {
      const { itemId } = req.params;
      await CartItem.findByIdAndDelete(itemId);
      res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
