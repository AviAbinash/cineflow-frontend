"use client";
 
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
 
const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const token = localStorage.getItem("token");
 
    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }
 
    try {
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
      setAuthenticated(true);
    } catch (error) {
      console.error("Token verification failed:", error);
      localStorage.removeItem("token");
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);
 
  return { authenticated, loading };
};
 
export default useAuth;