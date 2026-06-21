import mongoose, { Schema } from "mongoose";
import { z } from "zod";

const cartSchema= new Schema({
    quantity:{
        type:Number,
        required:true
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
})
export const Cart= mongoose.model("Cart",cartSchema);

export const cartValidation = z.object({
    product: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),
});