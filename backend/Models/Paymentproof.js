const mongoose=require("mongoose");

const payment_schema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    }
},{timestamps:true});

const payment_proof_model=mongoose.model("Payment",payment_schema);

module.exports=payment_proof_model;