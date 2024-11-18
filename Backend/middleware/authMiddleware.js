require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.header("x-auth-token");

    // Check for token  
    if(!token){
        return res.send(401).json({msg:"No token, authorization failed"});
    }

    try{
         // Verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //place all the details of the user
        req.user = decoded.user;
        next();
    }catch(error){
        console.error(error.message);
        res.status(500).send({msg:"Token is not Valid"});
    }
};

module.exports = {auth};
