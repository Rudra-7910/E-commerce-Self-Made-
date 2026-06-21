import jwt from "jsonwebtoken"
import { User } from "../models/user.js";
export const isAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token)
        {
            return res.status(403).json({
            message:"Unauthorized Access, Please Login"
        });
    }
    const decodedToken= jwt.verify(token,process.env.SECRET)
    req.user = await User.findById(decodedToken._id)    
    next();
    } 
    catch (error) {
        return res.status(403).json({
            message:"Unauthorized Access, Please Login"
        })
    }
}