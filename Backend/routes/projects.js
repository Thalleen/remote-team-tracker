const express = require("express");
const {createProject,getAllProjects,getProjectById, updateProject, deleteProject} = require("../controllers/projectController");
const {auth} = require("../middleware/authMiddleware");
const router= express.Router();

router.post("/",auth,createProject);

router.get("/",auth,getAllProjects);

router.get("/:id",auth,getProjectById);

router.put("/:id",auth,updateProject);

router.delete("/:id",auth,deleteProject);

module.exports = router;