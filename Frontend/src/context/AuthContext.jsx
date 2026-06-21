import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsAuth(false);
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.get("https://e-commerce-njbk.onrender.com/api/user/me", {
        headers: { token },
      });
      setUser(response.data);
      setIsAuth(true);
    } catch (error) {
      console.error("Failed to fetch profile", error);
      localStorage.removeItem("token");
      setUser(null);
      setIsAuth(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const login = (token) => {
    localStorage.setItem("token", token);
    fetchProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuth(false);
    window.location.href = "/login"; // Hard redirect to clean all state
  };

  const value = {
    user,
    isAuth,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
