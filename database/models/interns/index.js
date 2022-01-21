const mongoose = require('mongoose');

//schema is the structure of our database

const InternSchema = new mongoose.Schema({
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
    companyName: 
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
    }
    });


const InternModel = mongoose.model("Interns", InternSchema);
module.exports = InternModel