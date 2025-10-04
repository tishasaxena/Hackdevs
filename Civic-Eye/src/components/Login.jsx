import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authService} from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/AuthSlice';
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
        const userData = await authService.getUser();
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
if(loading){
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mx-auto w-full max-w-md bg-white rounded-xl p-8 shadow-md">
        <div className="mb-4 flex flex-col items-center text-center space-y-3">
          <h2 className="text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>
        </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?&nbsp;
          <Link
            to="/auth/user/signup"
            className="font-medium text-blue-600 transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Email address must be a valid address",
                    },
                  })}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-500"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}