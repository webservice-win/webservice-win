const mongoose=require("mongoose");

const video_review_schema=new mongoose.Schema({
   thumbnail:{
    type:String,
    required:true,
   },
     video_link:{
    type:String,
    required:true,
   },
},{timestamps:true});

const video_review_model=mongoose.model("Video_review",video_review_schema);

module.exports=video_review_model;