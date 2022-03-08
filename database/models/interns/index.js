const mongoose = require('mongoose');

//schema is the structure of our database

const InternSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: "Company",
        required: true
    },
    company: {
        type: String,
        required: true,
    },
    title:
    {
        type: String,
        required: true,
    },
    category:   //volunteer or intern
    {
        type: String,
    },
    industry:   //volunteer or intern
    {
        type: String,
    },
    type:   //full time or part time
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
    experience:
    {
        type: String
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
    skills:
    {
        type: Array
    },
    qualification:
    {
        type: Array
    },
    knowledge:
    {
        type: Array
    },
    perks:
    {
        type: Array
    },
    usersApplied: {
        type: Array,
    },
    usersAccepted: {
        type: Array,
    },
    userOnBoarded: {
        type: Array,
    },
},
    {
        timestamps: true
    });


const InternModel = mongoose.model("Interns", InternSchema);
module.exports = InternModel