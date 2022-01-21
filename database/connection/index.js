const mongoose = require("mongoose");
// require("dotenv").config();
const mongoURL = "mongodb+srv://sudhirAgrawal:Sudhir@A22@volunteercluster.c28sw.mongodb.net/VolunteerStartup?retryWrites=true&w=majority";
// const mongoURL = process.env.mongo_URL

const connectToMongo = ()=>{
    mongoose.connect(mongoURL, ()=>{
        console.log('connection with mongoDb established');
    })
}

module.exports = connectToMongo;