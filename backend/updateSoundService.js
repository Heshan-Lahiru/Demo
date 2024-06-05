const express = require('express');
const router = express.Router();
const multer = require('multer'); // Assuming sound uploads (optional)
const path = require('path'); // For path manipulation
const  SoundModel  = require('./models/SoundModel'); // Replace with your sound data model path

// Configure Multer for sound storage (adjust path and filename generation as needed)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../frontend/public/images/event')); // Adjust path
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage }); // Create Multer instance
// Route handler for updating a sound service
router.put('/updateSoundService/:serviceId',  upload.single('image'), async (req, res) => {
    try {
      const { name, location, price } = req.body;
      const { serviceId } = req.params;
  
      console.log('Received data:', req.body); 
  
      if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
      }
  
      const imageFileName = req.file.filename;
  
      const updatedSoundService = await SoundModel.findOneAndUpdate(
        { _id: serviceId },
        { $set: { name, location, price, image: imageFileName } },
        { new: true } 
      );
  
      if (!updatedSoundService) {
        return res.status(404).json({ error: "Sound service not found" });
      }
  
      res.status(200).json(updatedSoundService);
    } catch (error) {
      console.error('Error updating sound service:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


 // Route handler for deleting a sound service
router.delete('/deleteSoundService/:serviceId', async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
    
        await SoundModel.findByIdAndDelete(serviceId);
    
        res.status(200).json({ message: 'Sound service deleted successfully' });
      } catch (error) {
        console.error('Error deleting sound service:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    
router.get('/onlyusersounds/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const userSoundServices = await SoundModel.find({ userId });
  
      res.status(200).json(userSoundServices);
    } catch (error) {
      console.error('Error fetching user sound services:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

module.exports = router;
