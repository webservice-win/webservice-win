const mongoose=require("mongoose");

const achivement_schema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true});

const achievement_model=mongoose.model("Achievement",achivement_schema);

module.exports=achievement_model;