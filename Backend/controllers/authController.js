require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register User
const registerUser = async(req,res)=>{
    const {name,email,password,role} = req.body;

    try{ 
        // Check if user already exists
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already exists"});
        }

        // Create new user instance
        user = new User({
            name,
            email,
            password,
            role
        });
 
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        // Save user to database
        await user.save();

        // Generate JWT token
        const payload = {user: {id: user.id}};
        const token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn: "1h"});

        res.json({token});
    }catch(error){
        console.error("Registration Error:", error);
        console.log(error.message);
        res.status(500).send("Server Error");
    }
};

const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try{
        // Check if user exists
        const foundUser = await User.findOne({email});
        if(!foundUser){
            return res.status(400).json({msg:"Invalid Credentials"});
            }

            // Compare entered password with hashed password
            const isMatch = await bcrypt.compare(password,foundUser.password);
            if(!isMatch){
                return res.status(400).json({msg:"Invalid Credentials"});
            }

             // Generate JWT token
            const payload = {user:{id: foundUser._id}};
            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"});

            res.json({token});
        }catch(error){
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    };



module.exports = {registerUser,loginUser};
