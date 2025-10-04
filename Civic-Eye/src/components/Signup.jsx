import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {authService} from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/AuthSlice';
export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordValue = watch("password", "");
  const confirmPasswordValue = watch("confirmPassword", "");

  // Strong password regex: min 8, uppercase, lowercase, number, special char
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Generate a strong random password and autofill (with validation)
  const generateStrongPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (!strongPasswordRegex.test(password)) {
      return generateStrongPassword();
    }

    // Autofill both fields & trigger validation + mark dirty
    setValue("password", password, { shouldValidate: true, shouldDirty: true });
    setValue("confirmPassword", password, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // When password changes, re-validate confirmPassword so errors update immediately
  useEffect(() => {
    // only trigger if confirm has some value or password changed after suggest
    if (confirmPasswordValue) {
      trigger("confirmPassword");
    }
  }, [passwordValue, confirmPasswordValue, trigger]);

  const createAccount = async (data) => {
    setLoading(true);
  setError('');
  try {
    // 1. Create account in Appwrite Auth
    const userData = await authService.createAccount(data);

    if (userData) {
      // 2. Get current logged-in user
      const currentUser = await authService.getCurrentAccount();
      dispatch(login(currentUser));
      // 5. Navigate after signup
      navigate('/home');
    }
  } catch (err) {
    setError(err?.message || 'Something went wrong');
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
            Creating your account...
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
        <div className="mb-4 flex justify-center">
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?&nbsp;
          <Link
            to="/auth/user/login"
            className="font-medium text-blue-600 transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(createAccount)} className="mt-8">
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  placeholder="Enter your full name"
                  {...register("name", { required: "Full name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
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
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Email address must be valid",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2 flex gap-2 items-center">
                <input
                  id="password"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a strong password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: strongPasswordRegex,
                      message:
                        "Must be at least 8 chars, include uppercase, lowercase, number & special char",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                <button
                  type="button"
                  onClick={generateStrongPassword}
                  className="px-3 py-2 bg-blue-200 rounded-md text-sm hover:bg-blue-300"
                >
                  Suggest
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-base font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2 flex gap-2 items-center">
                <input
                  id="confirmPassword"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="px-3 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-500 disabled:opacity-50"
                disabled={
                  !strongPasswordRegex.test(passwordValue) ||
                  passwordValue !== confirmPasswordValue
                }
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}