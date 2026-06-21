import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SideBar from '../Components/SideBar'

function Cart() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("https://e-commerce-njbk.onrender.com/api/cart", {
      headers: { token }
    });
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart
  });

  const updateCartMutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const token = localStorage.getItem("token");
      await axios.put(`https://e-commerce-njbk.onrender.com/api/cart/update?action=${action}`, { id }, {
        headers: { token }
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["cart"])
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");
      await axios.delete(`https://e-commerce-njbk.onrender.com/api/cart/${id}`, {
        headers: { token }
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["cart"])
  });

  const placeOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://e-commerce-njbk.onrender.com/api/order/new", {
        ...orderData,
        method: "COD"
      }, {
        headers: { token }
      });
      return response.data;
    },
    onSuccess: () => {
      alert("Order placed successfully!");
      queryClient.invalidateQueries(["cart"]);
      navigate("/orders");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to place order");
    }
  });

  const onSubmit = (formData) => {
    placeOrderMutation.mutate(formData);
  };

  if (isLoading) return <h1 className='text-3xl flex text-center justify-center h-full w-full'>Loading...</h1>;
  if (error) return <p className='text-red-500'>Error: {error.message}</p>;

  return (
    <div className='flex gap-4 min-h-screen'>
      <SideBar />
      <div className='flex-1 p-5 flex flex-col lg:flex-row gap-8'>
        <div className='flex-1'>
          <h1 className='font-bold text-4xl mb-5'>Your Cart</h1>
          {data?.cart?.length === 0 ? (
            <p className='text-xl text-gray-500'>Your cart is empty.</p>
          ) : (
            data?.cart?.map((item) => (
              <div key={item._id} className='bg-white rounded-2xl p-5 shadow-md border border-2 flex items-center gap-4 mb-4'>
                <img src={item.product?.images?.[0]?.url} alt={item.product?.title} className='w-24 h-24 object-cover rounded-xl' />
                <div className='flex-1'>
                  <h2 className='font-semibold text-xl'>{item.product?.title}</h2>
                  <p className='font-bold text-lg text-gray-700'>₹{item.product?.price}</p>
                </div>
                <div className='flex items-center gap-3'>
                  <button 
                    onClick={() => updateCartMutation.mutate({ id: item._id, action: "dec" })}
                    className='bg-gray-200 px-3 py-1 rounded-lg font-bold'
                  >-</button>
                  <span className='font-bold'>{item.quantity}</span>
                  <button 
                    onClick={() => updateCartMutation.mutate({ id: item._id, action: "inc" })}
                    className='bg-gray-200 px-3 py-1 rounded-lg font-bold'
                  >+</button>
                </div>
                <button 
                  onClick={() => removeFromCartMutation.mutate(item._id)}
                  className='bg-red-500 text-white px-4 py-2 rounded-xl font-bold ml-4'
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {data?.cart?.length > 0 && (
          <div className='w-full lg:w-96 bg-white rounded-2xl p-6 shadow-md border border-2 h-fit'>
            <h2 className='font-bold text-2xl mb-4'>Order Summary</h2>
            <div className='flex justify-between mb-2 text-lg'>
              <span>Total Items:</span>
              <span className='font-bold'>{data.sumofQuantities}</span>
            </div>
            <div className='flex justify-between mb-6 text-lg'>
              <span>Subtotal:</span>
              <span className='font-bold text-green-600'>₹{data.subTotal}</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              <div>
                <label className='font-semibold mb-1 block'>Phone Number</label>
                <input 
                  type="text" 
                  className='border p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-400' 
                  placeholder='Enter phone number'
                  {...register("phone", { required: "Phone number is required" })}
                />
                {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>}
              </div>
              
              <div>
                <label className='font-semibold mb-1 block'>Delivery Address</label>
                <textarea 
                  className='border p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-400' 
                  placeholder='Enter complete address'
                  rows="3"
                  {...register("address", { required: "Address is required" })}
                ></textarea>
                {errors.address && <p className='text-red-500 text-sm mt-1'>{errors.address.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={placeOrderMutation.isPending}
                className='bg-green-500 hover:bg-green-600 transition-colors p-3 rounded-2xl mt-2 text-white font-bold w-full'
              >
                {placeOrderMutation.isPending ? "Placing Order..." : "Place Order (COD)"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
