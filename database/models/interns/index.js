const mongoose = require('mongoose');

//schema is the structure of our database

const InternSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: "Company",
        required: true
    },
    companyName: {
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
    type:   //volunteer/intern or full time
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
    skills:
    {
        type: Array
    },
    qualification:
    {
        type: Array
    },
    knowledgeNeeded:
    {
        type: Array
    },
    experience:
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