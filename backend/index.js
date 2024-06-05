const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const registerRouter = require('./register');
const eventaddRouter = require('./eventadd');
const servicesaddRouter = require('./servicesadd');
const loginRouter = require('./login');


const connectDB = require('./server/server');
connectDB() // Call the connectDB function
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error starting server:', err);
  });


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



  
app.post('/register', registerRouter);

app.post('/eventadd', eventaddRouter);
app.get('/onlyuserevents/:userId', eventaddRouter);
app.get('/getEvents', eventaddRouter);
app.get('/getEventDetails/:eventId', eventaddRouter);

// eventadd
app.post('/servicesadd', servicesaddRouter);
app.get('/getServices', servicesaddRouter);
app.delete('/deleteService/:serviceId', servicesaddRouter);
// service
app.post('/login', loginRouter);
// Login 
const getUsersRouter = require('./getUsers');
app.get('/getUsers', getUsersRouter);
// deleteUser
const deleteUserRouter = require('./deleteUser');
app.delete('/deleteUser/:userId', deleteUserRouter); 
// Delete Event
const deleteEventRouter = require('./deleteEvent');
app.delete('/deleteEvent/:id', deleteEventRouter); 
//updateevent
const updateEventRouter = require('./updateEvent');
app.put('/updateEvent/:id', updateEventRouter); 

//addSoundService

const addSoundServiceRouter = require('./addSoundService');
app.post('/addSoundService', addSoundServiceRouter); 
app.get('/getSoundServices', addSoundServiceRouter); 



//updateSoundService

const updateSoundServiceRouter = require('./updateSoundService');
app.put('/updateSoundService/:serviceId', updateSoundServiceRouter); 
app.delete('/deleteSoundService/:serviceId', updateSoundServiceRouter); 
app.get('/onlyusersounds/:userId', updateSoundServiceRouter); 



//addToCart

const addToCartRouter = require('./addToCart');
app.post('/addToCart', addToCartRouter); 
app.get('/getUserCart/:userId', addToCartRouter); 

app.delete('/removeFromCart/:itemId', addToCartRouter); 
//////////////////////////////////////////////////////////////

//post
const uploadpostRouter = require('./uploadpost');

app.post('/uploadpost', uploadpostRouter); 
app.get('/images', uploadpostRouter); 

app.delete('/images/:id', uploadpostRouter); 


////////////////////////////////////////
//payment
const paymentRouter = require('./payment');

app.post('/payment', paymentRouter); 
app.get('/gettickets', paymentRouter); 

app.delete('/deleteTicket/:id', paymentRouter); 

////////////////////////////////////////////////
//addRating
const addRatingRouter = require('./addRating');

app.post('/addRating', addRatingRouter); 
app.get('/getratings', addRatingRouter); 

app.delete('/deleteRating/:id', addRatingRouter); 
