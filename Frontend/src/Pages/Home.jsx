import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import SideBar from '../Components/SideBar'
function Home() {
  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:3000/api/product/all")
    return response.data
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
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

  if (isLoading) {
    return <h1 className='text-3xl flex text-center justify-center h-full w-full'>Loading...</h1>
  }

  if (error) {
    return <p className='text-red-500'>Error {error.message}</p>
  }

  return (
    <div className='flex gap-4 min-h-screen'>
      <SideBar />
      <div className='flex-1 p-5'>
        <h1 className='font-bold text-4xl mb-5'>Products</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {data?.products?.map((product) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
