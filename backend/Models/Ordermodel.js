const mongoose=require("mongoose");

const order_schema=new mongoose.Schema({
  invoice_id:{
    type:String,
  },
  customer_name:{
    type:String,
  },
  customer_email:{
   type:String
  },
  product_name:{
    type:String,
  },
  package_name:{
    type:String,
  },
   product_id:{
    type:String,
   },
     product_price:{
    type:String,
   },
   customer_id:{
    type:String,
   },
   provider_name:{
    type:String,
   },
   payeer_number:{
     type:String,
   },
   transaction:{
     type:String,
   },
   image:String,
   due_payment:Number,
   paid:Number,
   status:{
    type:String,
    default:"processing",
   }
},{timestamps:true});

const order_model=mongoose.model("Order",order_schema);

module.exports=order_model;