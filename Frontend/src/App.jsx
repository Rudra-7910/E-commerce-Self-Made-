import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from './Pages/Login.jsx';
import Register from './Pages/Register';
import Orders from './Pages/Orders.jsx';
import Home from './Pages/Home.jsx';
import Cart from './Pages/Cart.jsx';
import Profile from './Pages/Profile.jsx';
import AdminProducts from './Pages/AdminProducts.jsx';
import AdminOrders from './Pages/AdminOrders.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { useAuth } from './context/AuthContext.jsx';
const AuthRoute = ({ children }) => {
  const { isAuth, isLoading } = useAuth();
  if (isLoading) return null;
  if (isAuth) return <Navigate to="/" replace />;
  return children;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        } />
        <Route path="/register" element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />
        <Route path="/admin/products" element={
          <ProtectedRoute adminOnly={true}>
            <AdminProducts />
          </ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute adminOnly={true}>
            <AdminOrders />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
export default App
