const mongoose = require('mongoose');


const EventSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
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


const EventModel = mongoose.model('events', EventSchema);

module.exports = EventModel;
