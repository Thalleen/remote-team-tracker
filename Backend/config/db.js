// config runs dotenv
require("dotenv").config();

// This file connects to mogodb atlas
const mongoose = require("mongoose");

//This function will attempt to establish a connection to the database
const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://remote-tracker-user:remote-tracker@remote-team-tracker.8n73q.mongodb.net/remote-team-tracker?retryWrites=true&w=majority&appName=remote-team-tracker");

        console.log("MongoDB connected");
    }catch(error){
        console.error(error.message);
        process.exit(1);
    }
}

// Export the connectDB function for use in other modules
module.exports  = connectDB;