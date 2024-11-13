const mongoose = require("mongoose");
const {Schema} = mongoose;

const taskSchema = new Schema({
    title: {type:String,required: true},
    description: {type:String},
    projectId: {type: mongoose.Schema.Types.ObjectId, ref:"Project", required: true},
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    status: {type:String, enum:["To Do","In Progress","Completed"],default:"To Do"},
    priority: {type:String, enum:["Low","Medium","High"],default:"Medium"},
    duedate: {type:Date},
    createdAt: {type:Date,default:Date.now}

});

module.exports = mongoose.model("Task",taskSchema);