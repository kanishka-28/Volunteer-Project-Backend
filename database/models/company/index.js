const mongoose = require('mongoose');
//schema is the structure of our database

const CompanySchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    },
    title:
    {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    phone: 
    { 
        type: String
    },
    city: 
    {   
        type: String
    },
    description:
    {
        type: String
    },
    subtitle:
    {
        type: String
    },
    },
    );


const CompanyModel = mongoose.model("Company", CompanySchema);
module.exports = CompanyModel