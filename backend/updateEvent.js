const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // For path manipulation
const EventaddModel = require('./models/Eventadd'); // Replace with your event data model path

// Configure Multer for image storage (adjust path and filename generation as needed)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../frontend/public/images/event')); // Adjust path
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage }); // Create Multer instance

// Route handler for updating an event with image upload (using middleware)
router.put('/updateEvent/:id', upload.single('image'), async (req, res) => {
  try {
    const eventId = req.params.id;
    const { category, eventName, location, price } = req.body;

    // Check for image file upload (using Multer)
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageFileName = req.file.filename; // Access uploaded file name

    const existingEvent = await EventaddModel.findById(eventId);

    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Update event data (including image)
    existingEvent.image = imageFileName;
    existingEvent.category = category;
    existingEvent.eventName = eventName;
    existingEvent.location = location;
    existingEvent.price = price;

    const updatedEvent = await existingEvent.save();

    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
