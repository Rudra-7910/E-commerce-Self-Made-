import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import SideBar from '../Components/SideBar'
function Orders() {
  const fetchOrders= async()=>{
    const token= localStorage.getItem("token");
    const response= await axios.get(`${import.meta.env.PROD ? 'https://e-commerce-self-made-production.up.railway.app' : 'http://localhost:3000'}/api/order/my`,{
      headers:{
        token,
      },
    })
    return response.data
  }
  const {data,isLoading,error} =useQuery({
    queryKey:["orders"],
    queryFn:fetchOrders
  })
  if(isLoading)
  {
    return (
      <h1 className='text-3xl flex text-center justify-center h-full w-full'> Loading...</h1>
    )
  }
  if(error)
  {
    return(
        <p className='text-red-500'> Error {error.message}</p>
        )
  }
  return (
    <div className=' flex gap-4 min-h-screen'>
      <SideBar/>
      <div className='flex-1 p-5'>
      <h1 className='font-bold text-4xl mb-5 '>
        My Orders
      </h1>
    {data?.map((order) => (
  <div
    key={order._id}
    className='bg-white rounded-2xl p-5 shadow-md mb-4 w-128 border border-2 '
  >
    <div className='flex justify-between'>
      <p className='font-semibold'>
        Order #{order._id}
      </p>
      <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full'>
        {order.status}
      </span>
    </div>
    <p className=' text-gray-600'>
      Date: {new Date(order.createdAt).toLocaleDateString()}
    </p>
    <p className=''>
      Total: ₹{order.subTotal}
    </p>
    <hr className='my-3' />
    <div>
      {order.items.map((item) => (
        <p key={item._id}>
          {item.product.title} × {item.quantity}
        </p>
      ))}
    </div>
  </div>
))}
    </div>
    </div>
  )
}
export default Orders
