// backend/db.js
const mongoose = require('mongoose');

//connection to mongoDB
mongoose.connect("mongodb+srv://Dhananjay:MongoDB955@cluster0.w8zzo.mongodb.net/paytm?retryWrites=true&w=majority&appName=Cluster0")

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

// Accounts Schema

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
});



// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Account Model
const Account = mongoose.model('Account', accountSchema);

module.exports = {
	User,
    Account
};


// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// app.use(express.json());

// mongoose.connect("mongodb+srv://Dhananjay:MongoDB955@cluster0.w8zzo.mongodb.net/paytm")

// const userSchema = new mongoose.Schema({
//     username:String,
//     password:String,
//     firstName:String, 
//     lastName:String
// });

// const User = mongoose.model("User", userSchema);

// module.exports = {
//     User
// };