const mongoose = require('mongoose');
//schema is the structure of our database

const CompanySchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    },
    subTitle:
    {
        type: String,
    },
    email:
    {
        type: String,
    },
    city: 
    {   
        type: String
    },
    },
    );


const CompanyModel = mongoose.model("Company", CompanySchema);
module.exports = CompanyModel