import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authService } from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { appwriteService } from "../appwrite/configure";
export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();

  const passwordValue = watch("password", "");
  const confirmPasswordValue = watch("confirmPassword", "");

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const generateStrongPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (!strongPasswordRegex.test(password)) return generateStrongPassword();
    setValue("password", password, { shouldValidate: true, shouldDirty: true });
    setValue("confirmPassword", password, { shouldValidate: true, shouldDirty: true });
  };

  useEffect(() => {
    if (confirmPasswordValue) trigger("confirmPassword");
  }, [passwordValue, confirmPasswordValue, trigger]);

  const createAccount = async (data) => {
  setLoading(true);
  setError("");
  try {
    const userData = await authService.createAccount(data);
     const profile=await authService.getCurrentAccount();
    if (userData) {
         await appwriteService.createUser(profile.$id, {
        name: data.name,
        profileImageId: null,
        state: "",
        city: "",
        issuesReported: 0,
      });
      dispatch(login(profile));
      navigate("/home");
    }
  } catch (err) {
    setError(err?.message || "Something went wrong");
  }
  setLoading(false);
};


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="mx-auto w-full max-w-md bg-white rounded-xl p-8 shadow-md text-center">
          <h2 className="text-2xl font-bold">Creating your account...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Create a New Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/auth/user/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Error */}
        {error && <p className="text-red-500 text-center mt-4 text-sm">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(createAccount)} className="mt-6 space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register("name", { required: "Full name is required" })}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Email address must be valid",
                },
              })}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter a strong password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: strongPasswordRegex,
                    message:
                      "Must be 8+ chars with uppercase, lowercase, number & special char",
                  },
                })}
                className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 rounded-lg border border-gray-300 bg-gray-100 text-sm hover:bg-gray-200 transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <button
                type="button"
                onClick={generateStrongPassword}
                className="px-3 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
              >
                Suggest
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="px-3 rounded-lg border border-gray-300 bg-gray-100 text-sm hover:bg-gray-200 transition"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              !strongPasswordRegex.test(passwordValue) || passwordValue !== confirmPasswordValue
            }
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition disabled:opacity-50"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
