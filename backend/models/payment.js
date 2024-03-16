import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
     },
    email: {
       type: String,
       unique: true,
    },
    phone:{
        type:Number,
    },
    shippingAddress:{
        type:String,
    },
    bookId:{
        type:String,
    },
    amount:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Payment = mongoose.model("Payment", schema);