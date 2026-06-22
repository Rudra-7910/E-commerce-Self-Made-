import { useState, useEffect } from 'react'
import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query'
import axios from 'axios'
import SideBar from '../Components/SideBar'
function Home() {
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchInput])
  const fetchProducts = async () => {
    const response = await axios.get(`http://localhost:3000/api/product/all?search=${search}&category=${category}`)
    return response.data
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", search, category],
    queryFn: fetchProducts,
    placeholderData: keepPreviousData
  })
  const addToCartMutation = useMutation({
    mutationFn: async (productId) => {
      const token = localStorage.getItem("token")
      const response = await axios.post("http://localhost:3000/api/cart/add", { product: productId }, {
        headers: { token }
      })
      return response.data
    },
    onSuccess: () => {
      alert("Added to cart!")
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to add to cart")
    }
  })
  if (error) {
    return <p className='text-red-500'>Error {error.message}</p>
  }
  return (
    <div className='flex gap-4 min-h-screen'>
      <SideBar />
      <div className='flex-1 p-5'>
        <h1 className='font-bold text-4xl mb-5'>Products</h1>
        <div className='flex gap-4 mb-6'>
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 p-3 rounded-xl flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <select
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[150px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
          </select>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {isLoading ? (
            <div className='col-span-full flex justify-center py-10'>
              <h1 className='text-2xl font-semibold text-gray-500'>Loading products...</h1>
            </div>
          ) : data?.products?.length === 0 ? (
            <div className='col-span-full flex justify-center py-10'>
              <h1 className='text-2xl font-semibold text-gray-500'>No products found.</h1>
            </div>
          ) : (
            data?.products?.map((product) => (
              <div key={product._id} className='bg-white rounded-2xl p-5 shadow-md border border-slate-700 flex flex-col'>
                <img src={product.images?.[0]?.url} alt={product.title} className='w-full h-48 object-cover rounded-xl mb-4' />
                <h2 className='font-semibold text-xl'>{product.title}</h2>
                <p className='text-gray-600 flex-1'>{product.description}</p>
                <p className='font-bold text-lg mt-2'>₹{product.price}</p>
                <button
                  className='bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded-xl mt-4 transition-colors'
                  onClick={() => addToCartMutation.mutate(product._id)}
                  disabled={addToCartMutation.isPending}
                >
                  {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
export default Home
