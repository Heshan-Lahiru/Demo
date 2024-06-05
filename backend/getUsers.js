const express = require('express');
const router = express.Router();
const FormDataModel = require('./models/FormData'); // Replace with your user data model path

// Route handler for retrieving users
router.get('/getUsers', async (req, res) => {
  try {
    const users = await FormDataModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
