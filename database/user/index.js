import mongoose from "mongoose";

//schema is the structure of our database

const UserSchema = new mongoose.Schema({
    name:
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
    status: {
        type: String,
        required: true,
    },
    address: 
    { 
        type: String
    },
    city: 
    {   
        type: String
    },
    },
    {
        timestamps: true
    });


export const UserModel = mongoose.model("Users", UserSchema);