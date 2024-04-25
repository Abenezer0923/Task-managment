const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"]
    },
    email: {
        type: String,
        required: [true, "please enter your name"],
        unique: true
        
    },
    password: {
        type: String,
        required: [true, "please enter your name"], 
    },
    
})

const User = mongoose.model('User', userSchema);

module.exports = User;
