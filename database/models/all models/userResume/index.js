const mongoose = require('mongoose');

//schema is the structure of our database

const ResumeSchema = new mongoose.Schema({
    resumeTitle: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    github: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    facebook: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    qualification: [
        {
            college: {
                type: String,
            },
            fromYearClg: {
                type: String,
            },
            toYearClg: {
                type: String,
            },
            percentageClg: {
                type: String,
            },
            school: {
                type: String,
            },
            fromYearSchl: {
                type: String,
            },
            toYearSchl: {
                type: String,
            },
            percentageSchl: {
                type: String,
            },
        }
    ],
    projects:[
        {
            title:{type: String},
            link: {type: String},
            projectDescription:{type: String},
        }
    ],
    skills: {
        type: Array
    },
    interests: {
        type: Array
    },
    experience: [
        {
            companyName: {
                type: String,
            },
            position: {
                type: String,
            },
            duration: {
                type: String,
            },
            experienceDescription: {
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