const express=require("express");
const { model } = require("mongoose");
const order_model = require("../Models/Ordermodel");
const tutorial_model = require("../Models/Tutorial");
const user_route=express();
const multer=require("multer")
const nodemailer=require("nodemailer")
const jwt=require("jsonwebtoken")
const bcrypt = require("bcryptjs");
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
const invoice_model = require("../Models/Inoicemodel");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user:"shihabmoni15@gmail.com", // Your email address
    pass: "kxyb btad rldf fpsn", // Your email password or app password
  },
});
// Order Route
user_route.post("/product-order", async (req, res) => {
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
      customer_name,
      customer_email,
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
      return `INV-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
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
      customer_name,
      customer_email,
      paid,
      invoice_id: invoiceId, // Store generated invoice ID
      payeer_number, // Optional field
      transaction, // Optional field
      image, // Optional field
    });

    await order.save(); // Save the order details

    // Send invoice email
    await sendInvoiceEmail(customer_email, order, invoiceId);

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

// Function to Send Invoice Email
const sendInvoiceEmail = async (toEmail, order, invoiceId) => {
  const mailOptions = {
    from: '"Your Store" <your-email@gmail.com>',
    to: toEmail,
    subject: `Invoice for Order #${invoiceId}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Order Invoice</h2>
        <p>Dear <strong>${order.customer_name}</strong>,</p>
        <p>Thank you for your order! Below are the details of your purchase:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background: #f2f2f2;">Product</th>
            <th style="border: 1px solid #ddd; padding: 8px; background: #f2f2f2;">Price</th>
            <th style="border: 1px solid #ddd; padding: 8px; background: #f2f2f2;">Paid</th>
            <th style="border: 1px solid #ddd; padding: 8px; background: #f2f2f2;">Due</th>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${order.product_name}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${order.product_price}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${order.paid}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${order.due_payment}</td>
          </tr>
        </table>
        <p><strong>Invoice ID:</strong> ${invoiceId}</p>
        <p><strong>Provider:</strong> ${order.provider_name}</p>
        <p><strong>Transaction ID:</strong> ${order.transaction || "N/A"}</p>
        <p><strong>Payeer Number:</strong> ${order.payeer_number || "N/A"}</p>
        <p>If you have any questions, feel free to contact us.</p>
        <p>Best Regards,</p>
        <p>Your Store Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Invoice email sent to ${toEmail}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

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
// ----------------reset-password-------------------------


// Forget password route
user_route.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "programmingperson1@gmail.com",
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f4f4f4; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          <p style="color: #555;">Hello,</p>
          <p style="color: #555;">We received a request to reset your password. Click the button below to proceed:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.site_url}/reset-password/${user.email}" 
               style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #555;">If you did not request this, please ignore this email.</p>
          <p style="color: #555;">Thank you,<br>The Support Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// Route to reset password using email
user_route.post("/reset-password", async (req, res) => {
  try {
      const { email, newPassword } = req.body;
      console.log(req.body)

      // // Find user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
       console.log(user)
      // // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // // Update password in database
      const update_data=await UserModel.findByIdAndUpdate({_id:user._id},{$set:{password:hashedPassword}});
      if(update_data){
        res.json({ message: "Password updated successfully" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});
user_route.post("/update-invoice-letter/:id",async(req,res)=>{
  try {
      const find_invoice=await invoice_model.findOne({invoice_id:req.params.id});
      if(!find_invoice){
        return res.send({success:false,message:"Invoice not found!"})
      }
      const invoice_update=await invoice_model.findByIdAndUpdate({_id:find_invoice},{$set:{status:"accpeted"}})
  } catch (error) {
    console.log(error)
  }
})
module.exports=user_route;