const Project = require("../models/Project");
const User = require("../models/User");
const mongoose = require("mongoose");  
 
const createProject = async (req,res)=>{ 
    const {name,description,teamMembers} = req.body;

    try{

         // Convert user names to ObjectIds
         const memberIds = await Promise.all(
            teamMembers.map(async (memberName) => {
                const user = await User.findOne({ name: memberName });
                return user ? user._id : null; // Return ObjectId or null if not found
            })
        );
 
        // Filter out any null values (users not found)
        const validMemberIds = memberIds.filter(id => id !== null);

        const project = new Project({
            name,
            description,
            owner: req.user.id,
            teamMembers: validMemberIds,
    
        });

        await project.save();
        res.json(project);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const getAllProjects = async(req,res)=>{
    try{
        const projects = await Project.find({owner: req.user.id});
        res.json(projects);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
};

const getProjectById = async(req,res)=>{
    const projectId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ msg: "Invalid project ID" }); // Return 400 for invalid ID
    }

    try{
        const project = await Project.findById(projectId);
        if(!project){
            return res.status(404).json({msg:"Project not Found"});
        }

        res.json(project);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
};

const updateProject = async(req,res)=>{
    const{name,description,status,teamMembers} = req.body;
    
    try{
    let project = await Project.findById(req.params.id);
    if(!project){
        return res.status(404).json({msg:"Project not Found"});
    }

    project.name = name ||project.name;
    project.description = description ||project.description;
    project.status = status ||project.status;
    project.teamMembers = teamMembers ||project.teamMembers;

    await project.save();
    res.json(project);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const deleteProject = async(req,res)=>{
        try{
        const project = await Project.findByIdAndDelete(req.params.id);
        if(!project){
            return res.status(404).json({msg:"Project not Found"});
        }
        res.json({msg:"Project removed"});
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }

};
    
module.exports = {createProject,getAllProjects,getProjectById,updateProject,deleteProject};
