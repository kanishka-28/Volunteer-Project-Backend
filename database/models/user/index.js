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
    rating:
    {
        type: String,
    },
    password:
    {
        type: String,
        required: true,
    },
    phone: 
    { 
        type: String
    },
    address_line_1: 
    { 
        type: String
    },
    address_line_2: 
    { 
        type: String
    },
    zipcode: 
    { 
        type: String
    },
    state: 
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
    internsApplied: [
        {
            id:{
                type:String,
                required: true,
            },
            date:{
                type:String,
                required: true,
            },
            resume: {
                type: mongoose.Types.ObjectId,
                ref: "Company",
            },
            question: {
                type: String
            },
        }
    ],
    currentProjects: {
        type: Array
    },
    offers: {
        type: Array
    },
    },
    {
        timestamps: true
    });


const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;