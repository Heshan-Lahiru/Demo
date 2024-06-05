const express = require('express');
const router = express.Router();
const RatingModel = require('./models/Rating');
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


router.post('/addRating', upload.single('image'), async (req, res) => {
  try {
    const { eventName, stars } = req.body;

    console.log('Received data:', req.body);

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageFileName = req.file.filename;

    const newRating = await RatingModel.create({
      image: imageFileName,
      eventName,
      stars
    });

    res.status(201).json(newRating);
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/getratings', async (req, res) => {
    try {
      const ratings = await RatingModel.find();
      res.status(200).json(ratings); 
    } catch (error) {
      console.error('Error fetching ratings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  router.delete('/deleteRating/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      
      const deletedRating = await RatingModel.findByIdAndDelete(id);
  
     
      if (!deletedRating) {
        return res.status(404).json({ error: 'Rating not found' });
      }
  
     
      res.status(200).json({ message: 'Rating deleted successfully' });
    } catch (error) {
      console.error('Error deleting rating:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
