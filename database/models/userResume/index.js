const mongoose = require('mongoose');

//schema is the structure of our database

const ResumeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    qualification: {
        type: Array
    },
    skills: {
        type: Array
    },

},
    {
        timestamps: true
    });


const ResumeModel = mongoose.model("Resume", ResumeSchema);
module.exports = ResumeModel;