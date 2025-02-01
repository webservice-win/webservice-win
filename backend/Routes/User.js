const express=require("express");
const { model } = require("mongoose");
const order_model = require("../Models/Ordermodel");
const tutorial_model = require("../Models/Tutorial");
const user_route=express();
const multer=require("multer")
const nodemailer=require("nodemailer")
// ------------file-upload----------
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }
});
const uploadimage=multer({storage:storage});
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
const deposit_model = require("../Models/Depositmodel");
const UserModel = require("../Models/User");

user_route.post("/product-order", async (req, res) => {
  console.log("hello");
  try {
    const { 
      product_id, 
      product_price, 
      package_name,
      customer_id, 
      provider_name, 
      product_name, 
      due_payment, 
      paid, 
      payeer_number, 
      transaction, 
      image 
    } = req.body;

    console.log(transaction);

    // Validate required fields
    if (!product_id || !product_price || !customer_id || !provider_name || !product_name) {
      return res.status(400).send({
        success: false,
        message: "Missing required fields. Please provide all necessary information.",
      });
    }

    // Generate unique invoice ID
    const generateInvoiceId = () => {
      return `INV-2025-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;
    };

    const invoiceId = generateInvoiceId();

    // Fetch customer
    const customer = await UserModel.findById(customer_id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    // Create new order object
    const order = new order_model({
      product_id,
      product_price,
      customer_id,
      provider_name,
      product_name,
      due_payment,
      package_name,
      paid,
      invoice_id: invoiceId, // Store generated invoice ID
      payeer_number, // Optional field
      transaction, // Optional field
      image, // Optional field
    });

    // Update customer's financial details
    customer.paid_amount += paid || 0;
    customer.due_balance += due_payment || 0;
    customer.total_order += 1;

    // Save order and update customer details
    await order.save();
    await customer.save(); // <-- Important: Save the updated customer details

    // Respond with success
    res.status(201).send({
      success: true,
      message: "Order has been created successfully!",
      invoiceId,
    });

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
});

user_route.get("/all-tutorials",async(req,res)=>{
  try {
     const tutorial=await tutorial_model.find({category:"dashboard"});
     res.send({success:true,data:tutorial})
  } catch (error) {
      console.log(error)
  }
});

// ------------------------------
// Route to create a deposit
// Get all deposits or filter by userId or gatewayName
const generateInvoiceId = async () => {
  // Generate a unique ID based on a random value
  const uniqueId = crypto.randomBytes(16).toString('hex'); // 16 bytes = 32 hex characters
  const datePrefix = new Date().getFullYear(); // Use the current year as a prefix
  return `INV-${datePrefix}-${uniqueId}`;
};

user_route.post("/deposit", uploadimage.single("file"), async (req, res) => {
  try {
    const { gatewayName, customer_name, amount, senderNumber, transactionId, email, customer_id } = req.body;

    // Generate the unique invoice ID
    const invoiceId = await generateInvoiceId();
    console.log(invoiceId);

    // Prepare deposit data
    const depositData = {
      userId: customer_id,
      gatewayName,
      amount,
      senderNumber: senderNumber || null,
      transactionId: transactionId || null,
      email,
      customer_name,
      invoiceId, // Include the generated invoice ID
    };

    // Check if a file was uploaded and add it to depositData
    if (req.file) {
      depositData.file = req.file.filename;
    }

    const deposit = new deposit_model(depositData);
    await deposit.save();

    res.status(201).json({
      success: true,
      message: "Deposit created successfully",
      deposit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get all deposits or filter by userId or gatewayName
user_route.get("/deposits", async (req, res) => {
  try {
    const { userId, gatewayName } = req.query; // Extract query parameters

    // Build a query object
    const query = {};
    if (userId) query.userId = userId;
    if (gatewayName) query.gatewayName = gatewayName;

    // Fetch deposits based on the query
    const deposits = await deposit_model.find(query).sort({ createdAt: -1 }); // Sort by latest

    res.status(200).json({
      success: true,
      message: "Deposits retrieved successfully",
      deposits,
    });
  } catch (error) {
    console.error("Error retrieving deposits:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
});

user_route.get("/deposit/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the invoiceId from URL params
    console.log(id)
    // Find the deposit using the provided invoiceId
    const deposit = await deposit_model.find({ userId:id });
    console.log(req.params.id)
   res.send({message:"ok",data:deposit})
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

user_route.get("/deposit-invoice/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the invoiceId from URL params
    console.log(id)
    // Find the deposit using the provided invoiceId
    const deposit = await deposit_model.findById({ _id:id });
    console.log(deposit)
   res.send({message:"ok",data:deposit})
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// ------------------user-data--------------------
user_route.get("/user/:id",async(req,res)=>{
  try {
    const find_user=await UserModel.findById({_id:req.params.id});
    res.send({data:find_user})
  } catch (error) {
    console.log(error)
  }
});

user_route.get("/my-order-invoice/:id",async(req,res)=>{
  try {
    const order_invoice=await order_model.findById({_id:req.params.id});
    res.send({data:order_invoice})
    console.log(order_invoice)
  } catch (error) {
    console.log(error)
  }
});
// ----------------update-order---------------------
// Get all deposits or filter by userId or gatewayName
user_route.get("/update-order/:id", async (req, res) => {
  try {
       const update_order=await order_model.findById({_id:req.params.id});

  } catch (error) {
    console.error("Error retrieving deposits:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
});
module.exports=user_route;