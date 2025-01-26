const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema(
  {
    invoiceId:String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gatewayName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    senderNumber: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    customer_name:{
      type:String
    },
    email: {
      type: String,
    },
    file: {
      type: String, // URL/path to the uploaded file
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const deposit_model= mongoose.model("Deposit", depositSchema);
module.exports=deposit_model;
