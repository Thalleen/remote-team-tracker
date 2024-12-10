const mongoose = require("mongoose");
const {Schema} = mongoose;

const projectSchema = new Schema({ 
    name: {type:String, required:true},
    description: {type:String},
    status: {type:String,enum:["Not Started","In Progress","Completed"],default:"Not Started"},
    owner: {type: mongoose.Schema.Types.ObjectId,ref:"User",required:true}, // User who created the project
    teamMembers: [{type: mongoose.Schema.Types.ObjectId,ref:"User"}], 
    createdAt: {type:Date,default:Date.now}
});

module.exports = mongoose.model("Project",projectSchema);
 
