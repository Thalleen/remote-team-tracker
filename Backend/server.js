require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors")
const app = express();

const userRoutes = require('./routes/auth')
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks")

connectDB(); 

app.use(cors())
app.use(express.json());
app.use('/api/auth', userRoutes)
app.use("/api/projects",projectRoutes);
app.use("/api/tasks",taskRoutes);

app.get("/",(req,res)=>{
    res.send("API running");
});

const PORT = process.env.PORT||3000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));

