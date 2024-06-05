const express = require('express');
const router = express.Router();
const  EventaddModel  = require('./models/Eventadd'); // Replace with your event data model path

// Route handler for deleting an event
router.delete('/deleteEvent/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
    
       
        const deletedEvent = await EventaddModel.findByIdAndDelete(eventId);
    
        if (!deletedEvent) {
          return res.status(404).json({ error: "Event not found" });
        }
    
        res.json({ message: "Event deleted successfully" });
      } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
module.exports = router;
