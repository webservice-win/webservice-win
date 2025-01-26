const express=require("express");
const { model } = require("mongoose");
const order_model = require("../Models/Ordermodel");
const tutorial_model = require("../Models/Tutorial");
const user_route=express();

// -----------------------user dashboard--------------------
user_route.get("/dashboard",(req,res)=>{
    try {
        
    } catch (err) {
         console.log(err)
    }
});
// -=-------------------order-----------------------
// GET /dashboard route
const crypto = require('crypto');

user_route.post("/product-order", async (req, res) => {
  try {
    const { product_id, product_price, customer_id, provider_name, payeer_number, transiction, product_name } = req.body;
    console.log(product_id, product_price, customer_id, provider_name, payeer_number, transiction);

    // Validate query parameters
    if (!product_id || !product_price || !customer_id || !provider_name || !payeer_number || !transiction || !product_name) {
      return res.send({
        success: false,
        message: "All fields are required.",
      });
    }

    // Generate unique invoice ID: INV-2025-<randomString>
    const generateInvoiceId = () => {
      return `INV-2025-${crypto.randomBytes(6).toString('hex').toUpperCase()}`; // Creates a random 12-character hex string
    };

    const invoiceId = generateInvoiceId(); // Generate the invoice ID

    // Create a new order with the generated invoice ID
    const order = new order_model({
      product_id,
      product_price,
      customer_id,
      provider_name,
      payeer_number,
      transiction,
      product_name,
      invoice_id: invoiceId, // Add the generated invoice ID to the order
    });

    // Save the order to the database
    await order.save();

    // Respond with success
    res.status(201).send({ success: true, message: "Order has been created!", invoiceId });

  } catch (err) {
    console.error("Error creating order:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the order.",
    });
  }
});

user_route.get("/user-order/:id",async(req,res)=>{
    try {
        const order_data=await order_model.find({customer_id:req.params.id});
        if(order_data){
               res.send({success:true,data:order_data})
        }
    } catch (error) {
        console.log(error)
    }
})
user_route.get("/all-tutorials",async(req,res)=>{
  try {
     const tutorial=await tutorial_model.find({category:"dashboard"});
     res.send({success:true,data:tutorial})
  } catch (error) {
      console.log(error)
  }
});
// ------------------------------

module.exports=user_route;