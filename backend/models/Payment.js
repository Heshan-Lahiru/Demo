const mongoose = require('mongoose');

// Define schema for payment data
const PaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    }
});

// Create model based on schema
const PayModel = mongoose.model('Payment', PaySchema);

module.exports = PayModel;
