import React from 'react'
import { Link, useLocation } from "react-router-dom"
import { useAuth } from '../context/AuthContext'

function SideBar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  // Simple clean link styling
  const linkClass = (path) => `block px-4 py-3 rounded-lg transition-colors font-medium ${
    isActive(path) 
      ? 'bg-blue-100 text-blue-700' 
      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
  }`;

  return (
    <div className='w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col shadow-sm'>
      
      {/* Brand Section */}
      <div className='p-6 border-b border-gray-200 flex items-center justify-center gap-3'>
        <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
        <span className='font-bold text-2xl text-gray-800'>Shipify</span>
      </div>

      {/* Navigation Links */}
      <div className='flex flex-col p-4 gap-2 flex-1 overflow-y-auto'>
        
        <Link to="/" className={linkClass("/")}>
          Products
        </Link>
        <Link to="/cart" className={linkClass("/cart")}>
          Cart
        </Link>
        <Link to="/orders" className={linkClass("/orders")}>
          Orders
        </Link>
        <Link to="/profile" className={linkClass("/profile")}>
          Profile
        </Link>
        
        {/* Admin Section */}
        {user?.role === 'admin' && (
          <div className='mt-4 pt-4 border-t border-gray-200'>
            <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4'>Admin</p>
            <Link to="/admin/products" className={linkClass("/admin/products")}>
              Manage Products
            </Link>
            <Link to="/admin/orders" className={linkClass("/admin/orders")}>
              Manage Orders
            </Link>
          </div>
        )}

      </div>

      {/* Logout Section */}
      <div className='p-4 border-t border-gray-200'>
        <button 
          onClick={logout} 
          className='w-full text-left px-4 py-3 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors'
        >
          Log Out
        </button>
      </div>
      
    </div>
  )
}

export default SideBar