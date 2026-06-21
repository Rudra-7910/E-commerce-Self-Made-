import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import SideBar from '../Components/SideBar'

function AdminProducts() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:3000/api/product/all");
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: fetchProducts
  });

  const addProductMutation = useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem("token");
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("description", formData.description);
      formPayload.append("category", formData.category);
      formPayload.append("price", formData.price);
      formPayload.append("stock", formData.stock);
      
      // Append all selected files
      Array.from(formData.images).forEach((file) => {
        formPayload.append("files", file); // The backend expects 'files' array in multer
      });

      const response = await axios.post("http://localhost:3000/api/product/new", formPayload, {
        headers: { 
          token,
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data;
    },
    onSuccess: () => {
      alert("Product created successfully!");
      reset();
      queryClient.invalidateQueries(["admin-products"]);
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to create product");
    }
  });

  const onSubmit = (data) => {
    addProductMutation.mutate(data);
  };

  const deleteProductMutation = useMutation({
    mutationFn: async (productId) => {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/product/${productId}`, {
        headers: { token }
      });
    },
    onSuccess: () => {
      alert("Product deleted!");
      queryClient.invalidateQueries(["admin-products"]);
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to delete product");
    }
  });

  return (
    <div className='flex gap-4 min-h-screen'>
      <SideBar />
      <div className='flex-1 p-5 flex flex-col lg:flex-row gap-8'>
        
        <div className='flex-1'>
          <h1 className='font-bold text-4xl mb-5 text-yellow-600'>Manage Products</h1>
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {data?.products?.map((product) => (
                <div key={product._id} className='bg-white rounded-2xl p-4 shadow-md border border-2 flex items-center gap-4'>
                  <img src={product.images?.[0]?.url} alt={product.title} className='w-20 h-20 object-cover rounded-xl' />
                  <div>
                    <h2 className='font-semibold text-lg'>{product.title}</h2>
                    <p className='text-gray-600 text-sm'>Stock: {product.stock} | Sold: {product.sold}</p>
                    <p className='font-bold text-green-600'>₹{product.price}</p>
                  </div>
                  <button 
                    onClick={() => {
                      if(window.confirm("Are you sure you want to delete this product?")) {
                        deleteProductMutation.mutate(product._id);
                      }
                    }}
                    className='ml-auto bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg font-semibold transition-colors'
                    disabled={deleteProductMutation.isPending}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='w-full lg:w-96 bg-white rounded-2xl p-6 shadow-md border border-2 h-fit'>
          <h2 className='font-bold text-2xl mb-4'>Add New Product</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4' encType="multipart/form-data">
            
            <div>
              <label className='font-semibold mb-1 block'>Title</label>
              <input type="text" className='border p-2 rounded-xl w-full' placeholder='Product title'
                {...register("title", { required: true })} />
            </div>

            <div>
              <label className='font-semibold mb-1 block'>Description</label>
              <textarea className='border p-2 rounded-xl w-full' placeholder='Product description' rows="2"
                {...register("description", { required: true })}></textarea>
            </div>

            <div className='flex gap-4'>
              <div className='flex-1'>
                <label className='font-semibold mb-1 block'>Category</label>
                <input type="text" className='border p-2 rounded-xl w-full' placeholder='e.g., Electronics'
                  {...register("category", { required: true })} />
              </div>
              <div className='flex-1'>
                <label className='font-semibold mb-1 block'>Price (₹)</label>
                <input type="number" className='border p-2 rounded-xl w-full' placeholder='0'
                  {...register("price", { required: true, min: 1 })} />
              </div>
            </div>

            <div>
              <label className='font-semibold mb-1 block'>Initial Stock</label>
              <input type="number" className='border p-2 rounded-xl w-full' placeholder='0'
                {...register("stock", { required: true, min: 0 })} />
            </div>

            <div>
              <label className='font-semibold mb-1 block'>Images</label>
              <input type="file" multiple className='border p-2 rounded-xl w-full'
                {...register("images", { required: true })} />
            </div>

            <button 
              type="submit" 
              disabled={addProductMutation.isPending}
              className='bg-yellow-500 hover:bg-yellow-600 transition-colors p-3 rounded-2xl mt-2 text-white font-bold w-full'
            >
              {addProductMutation.isPending ? "Adding Product..." : "Create Product"}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default AdminProducts
