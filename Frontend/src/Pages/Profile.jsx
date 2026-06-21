import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import SideBar from '../Components/SideBar'

function Profile() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/user/me", {
      headers: { token }
    });
    return response.data;
  };
  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/user/address", {
      headers: { token }
    });
    return response.data;
  };

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile
  });

  const { data: addresses, isLoading: isAddressesLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddresses
  });

  const addAddressMutation = useMutation({
    mutationFn: async (addressData) => {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3000/api/user/address", addressData, {
        headers: { token }
      });
      return response.data;
    },
    onSuccess: () => {
      alert("Address added successfully!");
      reset();
      queryClient.invalidateQueries(["addresses"]);
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to add address");
    }
  });

  const deleteAddressMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/user/address/${id}`, {
        headers: { token }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
    }
  });

  const onSubmit = (data) => {
    addAddressMutation.mutate(data);
  };

  if (isUserLoading || isAddressesLoading) {
    return <h1 className='text-3xl flex text-center justify-center h-full w-full'>Loading...</h1>;
  }

  return (
    <div className='flex gap-4 min-h-screen'>
      <SideBar />
      <div className='flex-1 p-5 flex flex-col lg:flex-row gap-8'>
        <div className='flex-1'>
          <h1 className='font-bold text-4xl mb-5'>My Profile</h1>
          <div className='bg-white rounded-2xl p-6 shadow-md border border-2 mb-6'>
            <h2 className='font-semibold text-2xl mb-4'>User Details</h2>
            <p className='text-lg mb-2'><span className='font-bold'>Name:</span> {user?.name}</p>
            <p className='text-lg mb-2'><span className='font-bold'>Email:</span> {user?.email}</p>
            <p className='text-lg'><span className='font-bold'>Role:</span> <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm ml-2'>{user?.role}</span></p>
          </div>

          <h2 className='font-bold text-3xl mb-5'>My Addresses</h2>
          {addresses?.length === 0 ? (
            <p className='text-xl text-gray-500'>No addresses saved yet.</p>
          ) : (
            addresses?.map((addr) => (
              <div key={addr._id} className='bg-white rounded-2xl p-5 shadow-md border border-2 flex justify-between items-center mb-4'>
                <div>
                  <p className='font-semibold text-lg mb-1'>{addr.address}</p>
                  <p className='text-gray-600'>Phone: {addr.phoneNumber}</p>
                </div>
                <button 
                  onClick={() => deleteAddressMutation.mutate(addr._id)}
                  className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold transition-colors'
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div className='w-full lg:w-96 bg-white rounded-2xl p-6 shadow-md border border-2 h-fit'>
          <h2 className='font-bold text-2xl mb-4'>Add New Address</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div>
              <label className='font-semibold mb-1 block'>Phone Number</label>
              <input 
                type="text" 
                className='border p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-400' 
                placeholder='Enter phone number'
                {...register("phoneNumber", { required: "Phone number is required" })}
              />
              {errors.phoneNumber && <p className='text-red-500 text-sm mt-1'>{errors.phoneNumber.message}</p>}
            </div>
            
            <div>
              <label className='font-semibold mb-1 block'>Complete Address</label>
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
              disabled={addAddressMutation.isPending}
              className='bg-green-500 hover:bg-green-600 transition-colors p-3 rounded-2xl mt-2 text-white font-bold w-full'
            >
              {addAddressMutation.isPending ? "Adding..." : "Save Address"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
