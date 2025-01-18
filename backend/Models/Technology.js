const mongoose=require("mongoose");

const technology_schema=new mongoose.Schema({
    label:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    }
},{timestamps:true});

const technology_model=mongoose.model("Technology",technology_schema);

module.exports=technology_model;