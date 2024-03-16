import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
     },
    email: {
       type: String,
    },
    content:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Problems = mongoose.model("Problems", schema);
