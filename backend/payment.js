const express = require('express');
const router = express.Router();
const PayModel = require('./models/Payment');



// Route handler for processing a payment
router.post('/payment', async (req, res) => {
    try {
        const { name, mobileNumber } = req.body;
        const paymentData = new PayModel({ name, mobileNumber });
        await paymentData.save();
        res.status(201).json({ message: 'Payment data saved successfully', paymentData });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // API endpoint to fetch ticket booking data
router.get('/gettickets', async (req, res) => {
    try {
      const tickets = await PayModel.find();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.delete('/deleteTicket/:id', async (req, res) => {
    try {
      const id = req.params.id;
    
      await PayModel.findByIdAndDelete(id);
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      console.error('Error deleting ticket:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
