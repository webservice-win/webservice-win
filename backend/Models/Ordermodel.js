const mongoose=require("mongoose");

const order_schema=new mongoose.Schema({
  invoice_id:{
    type:String,
    required:true,
  },
  product_name:{
    type:String,
    required:true,
  },
   product_id:{
    type:String,
    required:true,
   },
     product_price:{
    type:String,
    required:true,
   },
   customer_id:{
    type:String,
    required:true,
   },
   provider_name:{
    type:String,
    required:true,
   },
   payeer_number:{
     type:String,
    required:true,
   },
   transiction:{
     type:String,
    required:true,
   },
   status:{
    type:String,
    enum: [
      "pending",
      "processing",
      "hold",
      "completed",
      "suspended",
    ],
   }
},{timestamps:true});

const order_model=mongoose.model("Order",order_schema);

module.exports=order_model;