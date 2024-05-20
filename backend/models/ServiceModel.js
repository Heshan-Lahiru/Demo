const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
});

const ServiceModel = mongoose.model('services', ServiceSchema);

module.exports = ServiceModel;
