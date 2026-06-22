import bufferGenerator from "../utils/bufferGenerator.js";
import { cloudinary } from "../utils/cloudinary.js";
import mongoose from"mongoose"
import TryCatch from "../utils/TryCatch.js";
import { Product } from "../models/products.js";
export const createProduct=TryCatch(async(req,res)=>{ 
    if(req.user.role!=="admin")
    {
        return res.status(403).json({message:"You are not Admin"})
    }
    const {title,description , category , price ,stock}=req.body
    const files= req.files
    if(!files||files.length==0)
    {
        return res.status(400).json({message:"Kindly attach photos of the product "})
    }
    const imageUploadPromises=files.map(async(file)=>{
        const fileBuffer=bufferGenerator(file)
        const result = await cloudinary.uploader.upload(fileBuffer.content)
        return {
            id:result.public_id,
            url:result.secure_url
        }
    })
    const uploadedImages=await Promise.all(imageUploadPromises)
    const product= await Product.create({
        title,
        description,
        category,
        price,
        stock ,
        images:uploadedImages
    })
    return res.json({message:"Product updated success",product})
})
export const updateProductDetails= TryCatch(async(req,res)=>{
    if(req.user.role!="admin")
    {
        return res.json({message:"Youa are not admin"})
    }
    const {description,title,price,stock,category}=req.body
    const updatedFields={};
    if(title)
        {updatedFields.title=title}
    if(category)
        {updatedFields.category=category}
    if(stock)
        {updatedFields.stock=stock}
    if(price)
        {updatedFields.price=price}
    if(description)
        {updatedFields.description=description}
    const updatedProduct= await Product.findByIdAndUpdate(req.params.id,updatedFields,
        {new:true,runValidators:true}
    )
    if(!updatedProduct)
    {
        return res.json({message:"Product not found"})
    }
    res.json({message:"Product has been updated successfully",updatedProduct})
})
export const updateImages= TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not admin",
    });
    const {id}=req.params;
    const product= await Product.findById(id);
    const files=req.files
    if(!product)
    {
        return res.json({message:"No such Product found"})
    }
    const oldImages= await product.images||[]
    for(const img of oldImages)
    {
        if(img.id)
        {
            await cloudinary.uploader.destroy(img.id);
        }
    }
    const imageUploadPromises= files.map(async(file)=>{
        const fileBuffer= bufferGenerator(file)
        const result=await cloudinary.uploader.upload(fileBuffer.content)
        return {
            id:result.public_id,
            url:result.secure_url
        }
    })
    const updatedImages= await Promise.all(imageUploadPromises);
    product.images=updatedImages
    await product.save()
    res.json({message:"Product Update successfully"},product)
})
export const getSingleProduct=TryCatch(async(req,res)=>{
    const {id}=req.params
    const product= await Product.findById(id)
    if(!product)
    {
        return res.json({message:"Product Not found"})
    }
    res.json({product})
})

export const getAllProducts = TryCatch(async (req, res) => {
    const { category, search } = req.query;
    let query = {};
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };
    
    const products = await Product.find(query).sort({createdAt: -1});
    res.json({ products });
});

export const deleteProduct = TryCatch(async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not admin" });
    }
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    if (product.images && product.images.length > 0) {
        for (const img of product.images) {
            if (img.id) {
                await cloudinary.uploader.destroy(img.id);
            }
        }
    }

    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
});