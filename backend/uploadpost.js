const express = require('express');
const router = express.Router();
const multer = require('multer'); // For image uploads
const path = require('path'); // For path manipulation
const postadd = require('./models/Post');

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
  

// Route handler for creating a post with optional image upload
router.post('/uploadPost', upload.single('image'), async (req, res) => {
    try {
        const image = new postadd({
          filename: req.file.filename
        });
    
        await image.save();
    
        res.status(201).json(image);
      } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });


    router.get('/images', async (req, res) => {
        try {
          const images = await postadd.find({}, 'filename'); 
          res.json(images);
        } catch (error) {
          console.error('Error fetching images:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
      
      
      router.delete('/images/:id', async (req, res) => {
        const postId = req.params.id;
      
        try {
          const deletedPost = await postadd.findByIdAndDelete(postId);
      
          if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
          }
      
          res.json({ message: 'Post deleted successfully' });
        } catch (error) {
          console.error('Error deleting post:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

module.exports = router;
