const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/authMiddleware");
const {createTask,getTasksByProject,getTaskById,updateTask,deleteTask} = require("../controllers/taskController");

router.post("/",auth,createTask);

router.get("/project/:projectId",auth,getTasksByProject);

router.get("/:id",auth,getTaskById);

router.put("/:id",auth,updateTask);

router.delete("/:id",auth,deleteTask);

module.exports = router;