import React, { useState, useEffect } from "react";
import { authService } from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";
import { useSelector } from "react-redux";
function AuthLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.Auth.isLoggedIn);
  useEffect(() => {
    setLoader(true);
    if (!authStatus) {
      navigate("/");
    }
    setLoader(false);
  }, []);

  if (loader) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-medium">Checking session...</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export default AuthLayout;
