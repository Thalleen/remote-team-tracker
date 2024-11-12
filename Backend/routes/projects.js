const express = require("express");
const {createProject,getAllProjects,getProjectById} = require("../controllers/projectController");
const {auth} = require("../middleware/authMiddleware");
const router= express.Router();

router.post("/",auth,createProject);

router.get("/",auth,getAllProjects);

router.get("/:id",auth,getProjectById);

module.exports = router;