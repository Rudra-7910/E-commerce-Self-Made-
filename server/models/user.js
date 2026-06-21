import { Schema } from "mongoose";
import mongoose from "mongoose"
import { z } from "zod";

const userSchema= new Schema({
   name:{
      type:String,
   },
     email:{
        type:String,
        required:true,
        unique:true,
     },
     role:
     {
        type:String,
        default:"User"
     },
     password:
     {
      type:String,
      required:true,
     }
    },
     {
        timestamps:true,
     }
)
export const User= mongoose.model("User",userSchema);

export const loginValidation = z.object({
    email: z.string().email("Invalid email address"),
});

export const verifyValidation = z.object({
    email: z.string().email("Invalid email address"),
    otp: z.number().int().min(100000, "OTP must be 6 digits").max(999999, "OTP must be 6 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});