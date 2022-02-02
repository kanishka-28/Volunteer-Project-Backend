const mongoose = require('mongoose');

//schema is the structure of our database

const UserSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
    },
    title:
    {
        type: String,
    },
    password:
    {
        type: String,
        required: true,
    },
    phoneNumber: 
    { 
        type: String
    },
    description: 
    { 
        type: String
    },
    skills: 
    { 
        type: Array
    },
    city: 
    { 
        type: String
    },
    },
    {
        timestamps: true
    });


const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;