import TryCatch from "../utils/TryCatch.js";
import sendOtp from "../utils/otp.js";
import { OTP } from "../models/otp.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
export const loginUser=TryCatch(async(req,res)=>{
    const {email,password}=req.body
    const user = await User.findOne({email})
    if(!user) {
        return res.status(404).json({
            message:"User does not exist, Kindly Register from register page"
        })
    }

    const subject= "E-commerce APP "
            const otp = Math.floor(Math.random()*1000000);
            const prevOtp=await OTP.findOne({
                email,
            })
            if(prevOtp)
            {
                await prevOtp.deleteOne()
            }
            await sendOtp({email,subject,otp})
            await OTP.create({email,otp})
            res.json({
                message:"OTP sent succesfully to your email "
            })
})
export const verifyUser=TryCatch(async(req,res)=>{
    const{email,otp,password}=req.body
    const haveOtp=await OTP.findOne({
        email,otp
    })
    if(!haveOtp)
    {
        return res.status(400).json({
            message:"Invalid OTP, please try again"
        })
    }
    let user= await User.findOne({email})
    if(user)
    {
        const isMatch= await bcrypt.compare(password,user.password)
        if(isMatch)
        {
        const token = jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:"1d"})
        await haveOtp.deleteOne();
        return res.status(201).json({
            message:"User Successfully Authenticated",
            token,
            user,
        })
        }
        if(!isMatch)
        {
            return res.json({message:"Password entered is Wrong"})
        }
    }
    else
    {
        res.json({message:"User does not exist , Kindly Register from register page"})
    }
})
export const RegisterUser= TryCatch(async(req,res)=>{
    const {email,password,name}=req.body;
    const userTry=await User.findOne({email})
    if(userTry)
    {
        return res.json({message:"User with this email already exists"});
    }
    const hashPassword=await bcrypt.hash(password,10);
    const otp= Math.floor(Math.random()*1000000);
    const user= await User.create({email,password:hashPassword,name})
    const subject= "OTP for registering new User"
    await sendOtp({email,subject,otp});
    await OTP.create({email,otp});
    return res.json({message:"Email has been sent to verify your account"})
});
export const verifyRegisterUser = TryCatch(async(req,res)=>{
    const { email, otp } = req.body;
    const user= await User.findOne({email}).select(-password);
    const haveOtp = await OTP.findOne({
        email,
        otp
    });
    if(!haveOtp){
        return res.status(400).json({
            message:"Invalid OTP"
        });
    }
    await haveOtp.deleteOne();
    const token  = jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:"1d"})
    return res.json({
        message:"Registeration successfull",
        token,
        user,
    })
})
export const myProfile=TryCatch(async(req,res)=>{
    const user= await User.findById(req.user._id)
    res.json(user);
})