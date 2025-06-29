import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { z as zod } from "zod";
import { Code, Eye, EyeOff, Loader, Lock, Mail } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";

const LoginSchema = zod.object({
  email: zod.string().email("Enter valid email"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoggingIn },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    console.log("Signup form submitted -->", data);
    //Api logic here
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-gray-800">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome back</h1>
              <p className="text-base-content/60">Login to continue</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            

            {/* Email */}
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`input input-bordered w-full pl-10 ${
                    errors.email ? "input-error" : ""
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`input input-bordered w-full pl-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
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
                className="btn btn-primary w-full"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" size={18} />
                    Creating...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* Redirect Link */}
          <div className="text-center mt-5">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern //accepts props
        title={"Welcome back!"}
        subtitle={"Login to access all sheets and playlists"}
      />
    </div>
  );
};

export default LoginPage;
