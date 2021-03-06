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
    category:   //volunteer or intern
    {
        type: String,
    },
    jobType:   //volunteer/intern or full time
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
    qualificationNeeded:
    {
        type: Array
    },
    knowledgeNeeded:
    {
        type: Array
    },
    experienceNeeded:
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
    position:
    {
        type: String
    },
    users: {
        type: Array,
    }
},
    {
        timestamps: true
    });


const InternModel = mongoose.model("Interns", InternSchema);
module.exports = InternModel