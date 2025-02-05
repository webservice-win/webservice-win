const mongoose=require("mongoose");

const invoice_schema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    amount:{
        type:String
    },
    customer_id:{
        type:String
    },
    due_amount:{
        type:String
    },
    invoice_id:String,
    message:String,
    status:{
        type:String,
        default:"sent"
    }
},{timestamps:true});

const invoice_model=mongoose.model("Invoice",invoice_schema);

module.exports=invoice_model;