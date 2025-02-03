const mongoose=require("mongoose");

const invoice_schema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    product_name:{
        type:String
    },
    product_price:{
        type:String
    },
    due_amount:{
        type:String
    },
    customer_id:{
        type:String
    },
    paid:{
        type:String
    },
    status:{
        type:String
    }

});

const invoice_model=mongoose.model("Invoice",invoice_schema);

module.exports=invoice_model;