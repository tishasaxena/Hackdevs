import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authService } from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentAccount();
        if(userData){
            dispatch(login(userData));
        }
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="mx-auto w-full max-w-md bg-white rounded-xl p-8 shadow-md">
            <div className="mb-4 flex flex-col items-center text-center space-y-3">
              <h2 className="text-2xl font-bold leading-tight">
                Signing you in...
              </h2>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Signing you in...
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Please wait while we log you in
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl p-8">
            {/* Header */}
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/auth/user/signup"
                className="font-medium text-indigo-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-center mt-4 text-sm">{error}</p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(handleLogin)} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Email address must be valid",
                    },
                  })}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition disabled:opacity-50"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );

}