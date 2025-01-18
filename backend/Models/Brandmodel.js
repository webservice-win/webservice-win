const mongoose=require("mongoose");

const brand_schema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
},{timestamps:true});

const brand_model=mongoose.model("Brand",brand_schema);

module.exports=brand_model;