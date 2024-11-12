const express = require("express");
const {registerUser, loginUser} = require("../controllers/authController");
const User = require("../models/User"); 
const {auth} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register",registerUser);
router.post("/loginUser",loginUser);
router.get("/user",auth,async (req,res)=>{
    try{
        //select ensures that everything is sent except password
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    }catch(error){
        console.error(error.message);
        res.status(500).send({msg:"Server error"});
    }
});

module.exports = router;

