const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    whatsapp:{
        type: String,
        required: true,
    },
    telegram:{
        type: String,
        required: true,
    },
    role:{
        type:String,
        default:"user"
    },
    deposit_balance:{
        type:Number,
        default:0
    },
    due_balance:{
        type:Number,
        default:0
    },
    total_order:{
        type:Number,
        default:0 
    },
    paid_amount:{
        type:Number,
        default:0
    }
},{timestamps:true});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;