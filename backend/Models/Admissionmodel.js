const mongoose=require("mongoose");

const admission_schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
        profession:{
        type:String,
        required:true
    },
        location:{
        type:String,
        required:true
    },
        schedule:{
        type:String,
        required:true
    },
},{timestamps:true});

const admission_model=mongoose.model("Admission",admission_schema);

module.exports=admission_model;