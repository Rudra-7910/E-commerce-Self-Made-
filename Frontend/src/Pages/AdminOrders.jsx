import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import SideBar from '../Components/SideBar'

function AdminOrders() {
  const queryClient = useQueryClient();

  const fetchAllOrders = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/order/admin/all", {
      headers: { token }
    });
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: fetchAllOrders
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/api/order/status/${id}`, { status }, {
        headers: { token }
      });
    },
    onSuccess: () => {
      alert("Order status updated!");
      queryClient.invalidateQueries(["admin-orders"]);
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to update status");
    }
  });

  const handleStatusChange = (e, orderId) => {
    updateStatusMutation.mutate({ id: orderId, status: e.target.value });
  };

  if (isLoading) return <h1 className='text-3xl flex text-center justify-center h-full w-full'>Loading...</h1>;
  if (error) return <p className='text-red-500'>Error: {error.message}</p>;

  return (
    <div className='flex gap-4 min-h-screen'>
      <SideBar />
      <div className='flex-1 p-5'>
        <h1 className='font-bold text-4xl mb-5 text-yellow-600'>Manage All Orders</h1>
        
        {data?.length === 0 ? (
          <p className='text-xl text-gray-500'>No orders found.</p>
        ) : (
          <div className='grid grid-cols-1 gap-4'>
            {data?.map((order) => (
              <div key={order._id} className='bg-white rounded-2xl p-5 shadow-md border border-2 flex flex-col md:flex-row justify-between md:items-center'>
                
                <div className='mb-4 md:mb-0'>
                  <p className='font-semibold text-lg'>Order #{order._id}</p>
                  <p className='text-gray-600 text-sm mb-2'>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className='text-sm'><span className='font-bold'>User:</span> {order.user?.name} ({order.user?.email})</p>
                  <p className='text-sm'><span className='font-bold'>Phone:</span> {order.phone}</p>
                  <p className='text-sm'><span className='font-bold'>Address:</span> {order.address}</p>
                  <p className='font-bold text-green-600 mt-2'>Total: ₹{order.subTotal}</p>
                </div>

                <div className='flex flex-col items-end gap-3'>
                  <span className='bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold'>
                    Method: {order.method}
                  </span>
                  
                  <div className='flex items-center gap-2'>
                    <label className='font-bold text-sm'>Status:</label>
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(e, order._id)}
                      disabled={updateStatusMutation.isPending}
                      className='border-2 border-yellow-400 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrders
