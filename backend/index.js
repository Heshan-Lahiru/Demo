const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const EventaddModel = require('./models/Eventadd');
const bcrypt = require('bcrypt');
const validator = require('validator');
const multer = require('multer');
const path = require('path');




const dotenv = require('dotenv');
dotenv.config(); 
const session = require('express-session')

const app = express();
app.use(express.json());

app.use(cors({}));


app.use(express.static('public'));

app.use(session({
  secret: 'your_secret_key_here', // Replace with a strong, random secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true for https in production
}));



// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
 
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
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageFileName = req.file.filename;

    // Save event data to database with image file name and userId
    const newEvent = await EventaddModel.create({
      image: imageFileName,
      category: req.body.category,
      eventName: req.body.eventName,
      location: req.body.location,
      price: req.body.price,
      userId: req.body.userId // Save userId to the database
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

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }
    
    req.session.userId = user._id;

    // Send user's name, email, and ID in the response
    res.json({ message: "Login successful", userId: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





app.get('/getUsers', (req,res) => {

  FormDataModel.find()
  .then(users => res.json(users))
  .catch(err => res.json(err))

})

app.delete('/deleteUser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the user from the 'users' collection
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting User:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





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

app.get('/getEvents', (req,res) => {

  EventaddModel.find()
  .then(events => res.json(events))
  .catch(err => res.json(err))

})

app.get('/onlyuserevents/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const events = await EventaddModel.find({ userId });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



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

    res.json(updatedEvent);  // Respond with the updated event
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
