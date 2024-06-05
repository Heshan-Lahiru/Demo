const express = require('express');
const router = express.Router();
const multer = require('multer'); // For image uploads
const path = require('path'); // For file path manipulation

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

const ServiceModel = require('./models/ServiceModel');

// Route handler for adding a service with image upload and error handling
router.post('/servicesadd', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).json({ error: "Image file is required" });
        }
    
        const imageFileName = req.file.filename;
        const { name, userId } = req.body;
    
        const existingService = await ServiceModel.findOne({ name, userId });
        if (existingService) {
          return res.status(400).json({ error: "Service with the same name already exists" });
        }
    
        const newService = await ServiceModel.create({
          name,
          image: imageFileName,
          details: req.body.details,
          userId
        });
    
        res.status(201).json(newService);
      } catch (error) {
        console.error('Error adding service:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    

///////////////////////////////////////////////////////////////////
router.get('/getServices', async (req, res) => {
    try {
      const services = await ServiceModel.find();
      res.json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  //////////////////////////////////////////////////////////////////////////////
  router.delete('/deleteService/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    try {
      const deletedService = await ServiceModel.findByIdAndDelete(serviceId);
      if (!deletedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
