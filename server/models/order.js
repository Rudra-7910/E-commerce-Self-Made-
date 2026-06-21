import { Schema } from "mongoose";
import mongoose from "mongoose"
import { z } from "zod";

const orderSchema= new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    paymentInfo:{
        type:String,
    },
    phone:{
        type:Number,
        required:true
    },
    status:{
        type:String
    },
    paidAt:{
        type:String
    },
    subTotal:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    },
    items: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
},
    {
        timestamps:true,
    }
)
export const Order= mongoose.model("Order",orderSchema)

export const orderValidation = z.object({
    method: z.string().min(1, "Payment method is required"),
    phone: z.number().int("Phone must be a number"),
    address: z.string().min(1, "Address is required"),
});