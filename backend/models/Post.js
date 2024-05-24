const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  }
});

const ImageModel = mongoose.model('Image', ImageSchema);

module.exports = ImageModel;
