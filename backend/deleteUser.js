const express = require('express');
const router = express.Router();
const FormDataModel = require('./models/FormData'); 

router.delete('/deleteUser/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const deletedUser = await FormDataModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
