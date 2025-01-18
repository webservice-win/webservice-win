const mongoose=require("mongoose");

const course_schema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
       total_reviews:{
        type:String,
        required:true
    },
       total_students:{
        type:String,
        required:true
    },
       online_price:{
        type:String,
        required:true
    },
       offline_price:{
        type:String,
        required:true
    }
},{timestamps:true});

const course_model=mongoose.model("Course",course_schema);

module.exports=course_model;