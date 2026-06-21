import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Register() {
    const [showOtp, setShowOtp] = useState(false);
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const RegisterUser = async(data)=>{
        const response = await axios.post("http://localhost:3000/api/user/register", data)
        return response.data
    }
    const verifyUser = async(data)=>{
        const response = await axios.post("http://localhost:3000/api/user/register/verify", data)
        return response.data
    }
    const RegisterMutuation = useMutation({
        mutationFn: RegisterUser,
        onSuccess: (data) => {
            console.log(data);
            setApiError("");
            setApiSuccess(data.message || "OTP sent successfully to your email"); 
            setShowOtp(true); 
        },
        onError: (error) => {
            console.log(error.response?.data);
            setApiSuccess("");
            setApiError(error.response?.data?.message || "Login failed");
        }
    })
    const verifyMutation = useMutation({
        mutationFn: verifyUser,
        onSuccess: (data) => {
            console.log(data);
            setApiError("");
            setApiSuccess(data.message || "Login successful!");
            if(data.token) {
                login(data.token);
            }
        },
        onError: (error) => {
            console.log(error.response?.data);
            setApiSuccess("");
            setApiError(error.response?.data?.message || "Verification failed");
        }
    })
    const { register, handleSubmit, formState:{errors} } = useForm()
    const onSubmit = (data) => {
        setApiError("");
        setApiSuccess("");
        if (!showOtp) {
            RegisterMutuation.mutate(data)
        } else {
            verifyMutation.mutate(data)
        }
    }
  return (
    <div className='h-screen flex flex-col justify-center items-center bg-slate-300'>
    <h1 className='text-4xl font-bold mb-8 font-serif text-slate-800'>
        Shipify
    </h1>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col border-2 p-10 rounded-2xl gap-4 bg-white w-96 shadow-lg'>
        <h2 className='text-2xl font-bold text-center text-slate-700 mb-4'>Register</h2>
        {apiError && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded '>
                <span className='block sm:inline'>{apiError}</span>
            </div>
        )}
        {apiSuccess && (
            <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded '>
                <span className='block sm:inline'>{apiSuccess}</span>
            </div>
        )}
        <label className='font-semibold'>Email</label>
        <input type="email" className='border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400' placeholder='Email Address' 
        {...register("email",{
            required:"Email is Required"
        })}/>
        {errors.email && (
          <p className='text-red-500 text-sm'>
            {errors.email.message}
          </p>
        )}
        <label className='font-semibold'>Password</label>
        <input type="password" className='border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400' placeholder='Password'
        {...register("password",{
            required:"Password is required",
            minLength:{
                value:8,
                message:"Minimum 8 length required"
            }
        })}/>
        {errors.password && (
          <p className='text-red-500 text-sm'>
            {errors.password.message}
          </p>
        )}
        {showOtp && (
            <>
                <label className='font-semibold'>OTP</label>
                <input type="text" className='border p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400' placeholder='Enter 6-digit OTP'
                {...register("otp",{
                    required: showOtp ? "OTP is required" : false
                })}/>
                {errors.otp && (
                  <p className='text-red-500 text-sm'>
                    {errors.otp.message}
                  </p>
                )}
            </>
        )}
        <button 
            type='submit' 
            className='bg-green-500 hover:bg-green-600 transition-colors p-3 rounded-2xl mt-5 text-white font-bold'
            disabled={RegisterMutuation.isPending || verifyMutation.isPending}
        >
            {RegisterMutuation.isPending || verifyMutation.isPending ? "Please wait..." : (showOtp ? "Verify & Login" : "Send OTP")}
        </button>
        <div className='text-center mt-4'>
            <p className='text-sm text-slate-600'>
                Don't have an account? <Link to="/login" className='text-green-600 font-semibold hover:underline'>Login here</Link>
            </p>
        </div>
    </form>
</div>
  )
}

export default Register
