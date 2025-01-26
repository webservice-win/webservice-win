const mongoose=require("mongoose");

const deposit_schema=new mongoose.Schema({
  payerr_number:{
    type:String,
    required:true,
  },
   transiction:{
    type:String,
    required:true,
   },
   status:{
    type:String,
    default:"pending"
   }
},{timestamps:true});

const deposit_model=mongoose.model("Order",deposit_schema);

module.exports=deposit_model;