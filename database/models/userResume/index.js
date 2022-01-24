const mongoose = require('mongoose');

//schema is the structure of our database

const ResumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    qualification: {
        type: Array
    },
    skills: {
        type: Array
    },
    experience: {
        type: Array
    }
},
    {
        timestamps: true
    });


const ResumeModel = mongoose.model("Resume", ResumeSchema);
module.exports = ResumeModel;