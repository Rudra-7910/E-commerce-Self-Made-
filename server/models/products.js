import mongoose, { Schema } from "mongoose";
import { z } from "zod";

const productSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    images:[
        {
            id:String,
            url:String
        },
    ],
    sold:
    {
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
})
export const Product= mongoose.model("Product",productSchema)

export const productValidation = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    stock: z.number().int().min(0, "Stock cannot be negative"),
    price: z.number().positive("Price must be positive"),
    category: z.string().min(1, "Category is required"),
});