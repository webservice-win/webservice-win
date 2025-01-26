const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  gatewayName: { type: String, required: true },
  currency: { type: String, required: true },
  rate: { type: String, required: true },
  minAmount: { type: Number, required: true },
  maxAmount: { type: Number, required: true },
  fixedCharge: { type: Number, required: true },
  percentCharge: { type: Number, required: true },
  depositInstruction: { type: String },
  userData:String,
  userData: [
    {
      type: { type: String, required: true },
      isRequired: { type: String, required: true },
      label: { type: String, required: true },
      width: { type: String, required: true },
      instruction: { type: String },
    },
  ],
  image: { type: String },
});

const payment_method_model= mongoose.model('PaymentMethod', paymentMethodSchema);

module.exports=payment_method_model;
