const mongoose = require('mongoose');

//schema is the structure of our database

const ResumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    qualification: [
        {
            name:{
                type: String,
                required: true
            },
            year:{
                type: String,
                required: true
            },
            extra:{
                type: String,
            },
        }
    ],
    skills: {
        type: Array
    },
    experience: [
        {
            name:{
                type: String,
                required: true
            },
            position:{
                type: String,
                required: true
            },
            duration:{
                type: String,
            },
            description:{
                type: String,
            },
        }
    ],
},
    {
        timestamps: true
    });


const ResumeModel = mongoose.model("Resume", ResumeSchema);
module.exports = ResumeModel;