const express = require('express');
const router = express.Router();
const FormDataModel = require('./models/FormData'); 
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await FormDataModel.findOne({ email });

    if (!user) {
      
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }
    
    req.session.userId = user._id;

    
    res.json({ message: "Login successful", userId: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
