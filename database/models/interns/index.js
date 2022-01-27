const mongoose = require('mongoose');

//schema is the structure of our database

const InternSchema = new mongoose.Schema({
    company: {
        type: mongoose.Types.ObjectId,
        ref: "Company",
        required: true
    },
    name:
    {
        type: String,
        required: true,
    },
    description:
    {
        type: String,
    },
    duration:
    {
        type: Number,
    },
    skillsNeeded: 
    {   
        type: String
    },
    stipend: 
    {
        type: Number,
    },
    location: 
    {
        type: String
    },
    user: 
    {
        type: Array
    },
    });


const InternModel = mongoose.model("Interns", InternSchema);
module.exports = InternModel