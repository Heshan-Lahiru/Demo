const mongoose = require('mongoose');

// Define schema for user registration/login data
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    }
});

// Create model based on schema
const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
