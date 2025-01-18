const mongoose=require("mongoose");

const video_schema=new mongoose.Schema({
   thumbnail:{
    type:String,
    required:true,
   },
     video_link:{
    type:String,
    required:true,
   },
   category:{
          type:String,
    required:true,
   }
},{timestamps:true});

const video_model=mongoose.model("video",video_schema);

module.exports=video_model;