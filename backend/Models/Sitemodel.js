const mongoose=require("mongoose");

const site_schema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
},{timestamps:true});

const site_model=mongoose.model("Site",site_schema);

module.exports=site_model;