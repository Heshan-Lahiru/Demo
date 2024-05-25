const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const EventaddModel = require('./models/Eventadd');
const ServiceModel = require('./models/ServiceModel');
const fs = require('fs');
const SoundModel = require('./models/SoundModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');



const dotenv = require('dotenv');
dotenv.config(); 
const session = require('express-session')

const app = express();
app.use(express.json());

app.use(cors({}));


app.use(express.static('public'));

app.use(session({
  secret: 'your_secret_key_here', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));



// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
 
.then(() => {
    console.log('MongoDB connected');
    
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

// Register
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

   
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
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

// Configure Multer 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../frontend/public/images/event')); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); 
  }
});


const upload = multer({ storage: storage }); 

// eventadd
app.post('/eventadd', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageFileName = req.file.filename;

    
    const newEvent = await EventaddModel.create({
      image: imageFileName,
      category: req.body.category,
      eventName: req.body.eventName,
      location: req.body.location,
      price: req.body.price,
      userId: req.body.userId 
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// servicesadd 
app.post('/servicesadd', upload.single('image'), async (req, res) => {
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



 

// Login 
app.post('/login', async (req, res) => {
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



app.get('/getUsers', (req,res) => {

  FormDataModel.find()
  .then(users => res.json(users))
  .catch(err => res.json(err))

})

app.delete('/deleteUser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

   
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





// Delete Event
app.delete('/deleteEvent/:id', async (req, res) => {
  try {
    const eventId = req.params.id;

   
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

app.get('/getServices', async (req, res) => {
  try {
    const services = await ServiceModel.find();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.delete('/deleteService/:serviceId', async (req, res) => {
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

    
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageFileName = req.file.filename; 

    
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

   
    const updatedEvent = await existingEvent.save();

    res.json(updatedEvent);  
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/addSoundService', upload.single('image'), async (req, res) => {
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

app.get('/getSoundServices', async (req, res) => {
  try {
    const soundServices = await SoundModel.find();
    res.json(soundServices);
  } catch (error) {
    console.error('Error fetching sound services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//  SoundModel defined

app.get('/onlyusersounds/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const userSoundServices = await SoundModel.find({ userId });

    res.status(200).json(userSoundServices);
  } catch (error) {
    console.error('Error fetching user sound services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/deleteSoundService/:serviceId', async (req, res) => {
  try {
    const serviceId = req.params.serviceId;

    await SoundModel.findByIdAndDelete(serviceId);

    res.status(200).json({ message: 'Sound service deleted successfully' });
  } catch (error) {
    console.error('Error deleting sound service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.put('/updateSoundService/:serviceId', upload.single('image'), async (req, res) => {
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


app.post('/addToCart', async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const CartItem = require('./models/CartItem');

    const existingCartItem = await CartItem.findOne({ userId, eventId });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      res.status(200).json({ message: 'Item quantity updated in cart' });
    } else {
      const newCartItem = new CartItem({ userId, eventId });
      await newCartItem.save();
      res.status(201).json({ message: 'Item added to cart successfully' });
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const CartItems = require('./models/CartItem');

app.get('/getUserCart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userCartEvents = await CartItems.find({ userId });
    res.status(200).json(userCartEvents);
  } catch (error) {
    console.error('Error fetching user cart events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const Event = require('./models/Eventadd');

// event details by event ID
app.get('/getEventDetails/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
   
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// remove item from cart
app.delete('/removeFromCart/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    await CartItems.findByIdAndDelete(itemId);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const postadd = require('./models/Post');

app.post('/uploadpost', upload.single('image'), async (req, res) => {
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

app.get('/images', async (req, res) => {
  try {
    const images = await postadd.find({}, 'filename'); 
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/images/:id', async (req, res) => {
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

const PayModel = require('./models/Payment');



app.post('/payment', async (req, res) => {
  try {
    const { name, mobileNumber } = req.body;
    const paymentData = new PayModel({ name, mobileNumber });
    await paymentData.save();
    res.status(201).json({ message: 'Payment data saved successfully', paymentData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to fetch ticket booking data
app.get('/gettickets', async (req, res) => {
  try {
    const tickets = await PayModel.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/deleteTicket/:id', async (req, res) => {
  try {
    const id = req.params.id;
  
    await PayModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const RatingModel = require('./models/Rating');

app.post('/addRating', upload.single('image'), async (req, res) => {
  try {
    const { eventName, stars } = req.body;

    console.log('Received data:', req.body);

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageFileName = req.file.filename;

    // Assuming you have a RatingModel for storing ratings
    const newRating = await RatingModel.create({
      image: imageFileName,
      eventName,
      stars
    });

    res.status(201).json(newRating);
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET route to fetch ratings data
app.get('/getratings', async (req, res) => {
  try {
    // Fetch ratings data from the database
    const ratings = await RatingModel.find();
    res.status(200).json(ratings); // Send ratings data as JSON response
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to delete a rating by ID
app.delete('/deleteRating/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Find the rating by ID and delete it
    const deletedRating = await RatingModel.findByIdAndDelete(id);

    // Check if rating exists
    if (!deletedRating) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Rating deleted successfully' });
  } catch (error) {
    console.error('Error deleting rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





