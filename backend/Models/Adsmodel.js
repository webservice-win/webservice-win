const mongoose=require("mongoose");

const ads_schema=new mongoose.Schema({
    image:{
    type:String,
    required:true,
   },
   url:{
    type:String,
    required:true,
   },
},{timestamps:true});

const ads_model=mongoose.model("Ad",ads_schema);

module.exports=ads_model;