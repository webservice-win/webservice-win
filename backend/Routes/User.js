const express=require("express");
const { model } = require("mongoose");
const order_model = require("../Models/Ordermodel");
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
user_route.post("/product-order", async (req, res) => {
    try {
      const { product_id, product_price,customer_id,provider_name,payeer_number,transiction,product_name} = req.body;
       console.log(product_id, product_price,customer_id,provider_name,payeer_number,transiction)
      // Validate query parameters
      if (!product_id || !product_price || !customer_id || !provider_name || !payeer_number || !transiction || !product_name) {
        return res.send({
          success: false,
          message: "All fileds are required.",
        });
      }
  
      // Query the database to fetch matching orders
      const orders = new order_model({
        product_id, product_price,customer_id,provider_name,payeer_number,transiction,product_name
      });
    if(orders){
        orders.save()
        res.send({success:true,message:"Order has been created!"})
    }

    } catch (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching the orders.",
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

// ------------------------------

module.exports=user_route;