const mongoose=require("mongoose");

const category_schema=new mongoose.Schema({
    label:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    }
},{timestamps:true});

const category_model=mongoose.model("Category",category_schema);

module.exports=category_model;