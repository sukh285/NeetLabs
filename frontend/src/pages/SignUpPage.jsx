import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { z as zod } from "zod";
import { Code, Eye, EyeOff, Loader } from "lucide-react";

const SignUpSchema = zod.object({
  email: zod.string().email("Enter valid email"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  name: zod.string().min(3, "Name must be at least 3 characters"),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    console.log("Signup form submitted -->", data);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="flex flex-col justify-center items-center p-6 sm:p-10 w-full max-w-md bg-white rounded-xl shadow-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center transition-colors group-hover:bg-gray-800">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold mt-2 text-gray-900">Welcome</h1>
            <p className="text-gray-500 text-sm">Sign up to continue</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
          {/* Name */}
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text text-gray-500">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.name ? "input-error" : ""
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text text-gray-500">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.email ? "input-error" : ""
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text text-gray-500">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`input input-bordered w-full pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.password ? "input-error" : ""
                }`}
                {...register("password")}
              />
              <span
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control">
            <button
              type="submit"
              className="btn btn-primary w-full transition-all duration-200 hover:scale-[1.01]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin mr-2" size={18} />
                  Creating...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        {/* Redirect Link */}
        <div className="text-center mt-5">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
