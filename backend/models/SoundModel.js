// models/SoundModel.js

const mongoose = require('mongoose');

const soundSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: String, // Assuming userID is a string
    required: true
  },
  serviceId: {
    type: String, // Assuming serviceID is a string
    required: true
  }
});

const SoundModel = mongoose.model('Sound', soundSchema);

module.exports = SoundModel;
