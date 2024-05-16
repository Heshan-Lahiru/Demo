const mongoose = require('mongoose');

// Define schema for event data
const EventSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    eventName: {
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
    }
});

// Create model based on schema
const EventModel = mongoose.model('events', EventSchema);

module.exports = EventModel;
