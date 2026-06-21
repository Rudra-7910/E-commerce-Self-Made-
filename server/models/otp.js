import { Schema } from "mongoose";
import mongoose from "mongoose"
import { z } from "zod";

const userSchema= new Schema({
     email:{
        type:String,
        required:true,
        unique:true,
     },
     otp:
     {
        type:Number,
        required:true,
     },
    },
     {
        timestamps:true,
     }
)
export const OTP= mongoose.model("OTP",userSchema);

export const otpValidation = z.object({
    email: z.string().email("Invalid email address"),
    otp: z.number().int().min(100000, "OTP must be 6 digits").max(999999, "OTP must be 6 digits"),
});