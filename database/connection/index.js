const mongoose = require("mongoose");
// require("dotenv").config();
const mongoURL = "mongodb+srv://Kat:bunny_KAT_25@inotebookcluster.delsr.mongodb.net/iNoteBook?retryWrites=true&w=majority";
// const mongoURL = process.env.mongo_URL

const connectToMongo = ()=>{
    mongoose.connect(mongoURL,
        () => {
        console.log('connection with mongoDb established');
    })
}

module.exports = connectToMongo;