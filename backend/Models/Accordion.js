const mongoose=require("mongoose");

const accordion_schema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    }
},{timestamps:true});

const accordion_model=mongoose.model("Accordion",accordion_schema);

module.exports=accordion_model;