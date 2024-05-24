const mongoose = require('mongoose');

// Define schema for rating data
const RatingSchema = new mongoose.Schema({
  image: {
    type: String, // Assuming the image file name will be stored
    required: true
  },
  eventName: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true
  }
});

// Create model based on schema
const RatingModel = mongoose.model('Rating', RatingSchema);

module.exports = RatingModel;
