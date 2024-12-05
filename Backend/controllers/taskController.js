const Task = require("../models/Task");
const User = require("../models/User");

// Create a new task
const createTask = async(req,res)=>{
    const{title,description,projectId,assignedTo,status,priority,dueDate} = req.body; 

    try{
        const users = await User.find({});
        
        const userMappings = {};

        users.forEach(user=>{
            userMappings[user.name] = user._id; 
        });

        const assignedToId = userMappings[assignedTo];

        if (!assignedToId) {
            return res.status(400).json({ msg: "Assigned user not found" });
        }

        const task = new Task({
            title,
            description, 
            projectId,
            assignedTo: assignedToId,
            status,
            priority,
            dueDate
        });

       await task.save();
       res.json(task);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Get all tasks for a specific project
const getTasksByProject = async(req,res)=>{
    try{
        const tasks = await Task.find({projectId: req.params.projectId});
        if(!tasks){
            return res.status(404).json({msg:"No tasks found"});
        }

        res.json(tasks);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const getTaskById = async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({msg:"Task not found"});
        }

        res.json(task);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Update a task by ID
const updateTask = async(req,res)=>{
    const { title, description, status, priority, assignedTo, dueDate } = req.body;
    try{
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });
    
        // Update fields
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.assignedTo = assignedTo || task.assignedTo;
        task.dueDate = dueDate || task.dueDate;
    
        await task.save();
        res.json(task);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete a task by ID
const deleteTask = async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({msg:"Task not found"});
        }

        res.json({msg:"Task Removed"});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

module.exports = {createTask,getTasksByProject,getTaskById,updateTask,deleteTask};
