const express = require('express');
const router = express.Router();
const FormDataModel = require('./models/FormData');
const bcrypt = require('bcrypt');
const validator = require('validator'); // For data validation

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
       
        if (!validator.isEmail(email)) {
          return res.status(400).json({ error: "Invalid email sformat" });
        }
    
        if (!validator.isAlpha(name, 'en-US', { ignore: " " })) {
          return res.status(400).json({ error: "Name should only contain alphabets" });
        }
    
        
        const hashedPassword = await bcrypt.hash(password, 10);
    
        
        const newUser = await FormDataModel.create({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

module.exports = router;
