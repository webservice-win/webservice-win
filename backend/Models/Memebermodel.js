const mongoose=require("mongoose");

const member_schema=new mongoose.Schema({
   image:{
    type:String,
    required:true,
   },
     name:{
    type:String,
    required:true,
   },
   designation:{
    type:String,
    required:true,
   },
   facebook_link:{
     type:String,
    required:true,
   },
   twitter_link:{
     type:String,
    required:true,
   }
},{timestamps:true});

const member_model=mongoose.model("member",member_schema);

module.exports=member_model;