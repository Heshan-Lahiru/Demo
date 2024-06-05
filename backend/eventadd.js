const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../frontend/public/images/event')); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage }); 

const EventaddModel = require('./models/Eventadd'); 

router.post('/eventadd', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageFileName = req.file.filename;

    const newEvent = await EventaddModel.create({
      image: imageFileName,
      category: req.body.category,
      eventName: req.body.eventName,
      location: req.body.location,
      price: req.body.price,
      userId: req.body.userId
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/onlyuserevents/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const events = await EventaddModel.find({ userId });
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/getEvents', (req,res) => {

    EventaddModel.find()
    .then(events => res.json(events))
    .catch(err => res.json(err))
  
  })

router.get('/getEventDetails/:eventId', async (req, res) => {
    try {
      const eventId = req.params.eventId;
      
      const event = await EventaddModel.findById(eventId);
    
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      
     
      res.status(200).json(event);
    } catch (error) {
      console.error('Error fetching event details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;
