import mongoose from "mongoose";
import {Schema} from "mongoose";
import { z } from "zod";

 const addressSchema= new Schema({
    address:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})
export const Address= mongoose.model("Address",addressSchema);

export const addressValidation = z.object({
    address: z.string().min(1, "Address is required"),
    phoneNumber: z.number().int("Phone number must be a number"),
});
