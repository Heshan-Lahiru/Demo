const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path'); 
const  SoundModel  = require('./models/SoundModel'); 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../frontend/public/images/event')); 
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage }); 
router.post('/addSoundService', upload.single('image'), async (req, res) => {
    try {
        const { name, location, price, userID, serviceID } = req.body;
    
        console.log('Received data:', req.body); 
    
        if (!req.file) {
          return res.status(400).json({ error: "Image file is required" });
        }
    
        const imageFileName = req.file.filename;
    
       
        const newSoundService = await SoundModel.create({
          image: imageFileName,
          name,
          location,
          price,
          userId: userID, 
          serviceId: serviceID
        });
    
        res.status(201).json(newSoundService);
      } catch (error) {
        console.error('Error adding sound service:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });


    router.get('/getSoundServices', async (req, res) => {
        try {
          const soundServices = await SoundModel.find();
          res.json(soundServices);
        } catch (error) {
          console.error('Error fetching sound services:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
      

module.exports = router;
