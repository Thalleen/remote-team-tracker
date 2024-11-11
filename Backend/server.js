require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");


const app = express();

connectDB();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API running");
});

const PORT = process.env.PORT||3000;
console.log(PORT);

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
