const mongoose=require("mongoose");

const review_schema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});

const review_model=mongoose.model("Feedback",review_schema);

module.exports=review_model;