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
    category:
    {
        type: String,
    },
    description:
    {
        type: String,
    },
    duration:
    {
        type: String,
    },
    skillsNeeded: 
    {   
        type: Array
    },
    stipend: 
    {
        type: String,
    },
    location: 
    {
        type: String
    },
    users: 
    {
        type: Array
    },
    });


const InternModel = mongoose.model("Interns", InternSchema);
module.exports = InternModel