const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const EventaddModel = require('./models/Eventadd');
const bcrypt = require('bcrypt');
const validator = require('validator');
const multer = require('multer');
const path = require('path');


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://lahiruheshan454:0PYlACm6PnnaksAV@date.hrteqjj.mongodb.net/?retryWrites=true&w=majority&appName=date')
  .then(() => {
    console.log('MongoDB connected');
    // Start the server after successfully connecting to MongoDB
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validator.isAlpha(name, 'en-US', { ignore: " " })) {
      return res.status(400).json({ error: "Name should only contain alphabets" });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await FormDataModel.create({ name, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../frontend/public/images/event')); // Set destination directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // Generate unique file name
  }
});


const upload = multer({ storage: storage }); // Define the upload variable

// Update /eventadd endpoint to handle file uploads
app.post('/eventadd', upload.single('image'), async (req, res) => {
  try {
    // Check if image file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageFileName = req.file.filename; // Get the uploaded image file name

    // Save event data to database with image file name
    const newEvent = await EventaddModel.create({
      image: imageFileName,
      category: req.body.category,
      eventName: req.body.eventName,
      location: req.body.location,
      price: req.body.price
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});








// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await FormDataModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Stored hashed password:", user.password); // Log hashed password from database
    console.log("Provided password:", password); // Log plain-text password provided by user

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log("Password match:", passwordMatch); // Log the result of password comparison

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getEvents', (req,res) => {

  EventaddModel.find()
  .then(events => res.json(events))
  .catch(err => res.json(err))

})

// Delete Event Endpoint
app.delete('/deleteEvent/:id', async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find the event by ID and delete it
    const deletedEvent = await EventaddModel.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Update Event Endpoint
app.put('/updateEvent/:id', upload.single('image'), async (req, res) => {
  try {
    const eventId = req.params.id;
    const { category, eventName, location, price } = req.body;

    // Check if image file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageFileName = req.file.filename; // Get the uploaded image file name

    // Find the event by ID
    const existingEvent = await EventaddModel.findById(eventId);

    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Update event data
    existingEvent.image = imageFileName;
    existingEvent.category = category;
    existingEvent.eventName = eventName;
    existingEvent.location = location;
    existingEvent.price = price;

    // Save the updated event
    const updatedEvent = await existingEvent.save();

    res.json(updatedEvent);

    window.location.href = "/adminshowevent";

  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






