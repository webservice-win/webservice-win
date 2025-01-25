const mongoose=require("mongoose");

const tutorial_schema=new mongoose.Schema({
   thumbnail:{
    type:String,
    required:true,
   },
   title:{
    type:String,
    required:true,
   },
     tutorial_link:{
    type:String,
    required:true,
   },
   category:{
    type:String,
    required:true,
   }
},{timestamps:true});

const tutorial_model=mongoose.model("Tutorial",tutorial_schema);

module.exports=tutorial_model;