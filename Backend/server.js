require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors")
const app = express();

const userRoutes = require('./routes/auth')

connectDB();

app.use(cors())
app.use(express.json());
app.use('/api/auth', userRoutes)

app.get("/",(req,res)=>{
    res.send("API running");
});

const PORT = process.env.PORT||3000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));

