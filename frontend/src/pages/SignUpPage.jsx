import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { z as zod } from "zod";
import { Code, Eye, EyeOff, Loader, Lock, Mail } from "lucide-react";

import Particles from "../templates/Particles";
import { useAuthStore } from "../store/useAuthStore";

const SignUpSchema = zod.object({
  email: zod.string().email("Enter valid email"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  name: zod.string().min(3, "Name must be at least 3 characters"),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const { signup, isSigningUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  useEffect(() => {
    // Fade in the form after a short delay for a subtle effect
    const timeout = setTimeout(() => setFormVisible(true), 20);
    return () => clearTimeout(timeout);
  }, []);

  const onSubmit = async (data) => {
    console.log("Signup form submitted -->", data);
    try {
      await signup(data);
      console.log("Signup data -->", data);
    } catch (error) {
      console.log("Signup failed -->", error);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-bl from-neet-neutral via-neet-primary to-neet-neutral font-inter">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#FFFFFF", "#F5F5F5"]}
          particleCount={150}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Centered Form Container */}
      <div className="relative z-1 flex items-center justify-center h-screen px-4">
        <div
          className={`w-full max-w-sm space-y-8 transition-opacity duration-300 ${
            formVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-neet-base-100/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-neet-base-100/20 transition-all duration-300 shadow-lg border border-neet-base-100/20">
                <Code className="w-5 h-5 text-neet-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-neet-base-100">Welcome</h1>
              <p className="text-neet-accent/80 text-sm text-center">
                Sign up to continue your journey
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-neet-neutral/30 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-neet-base-100/30 hover:shadow-neet-secondary/20 transition-all duration-300">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="label-text pb-1 font-semibold text-neet-accent">Name</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Code className="h-5 w-5 text-neet-primary/60 group-hover:text-neet-secondary transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className={`input w-full pl-12 pr-4 py-2.5 bg-neet-base-100 border-2 border-neet-base-200/50 rounded-xl hover:border-neet-secondary/50 focus:border-neet-secondary focus:bg-neet-base-100 transition-all duration-300 text-neet-neutral placeholder-neet-neutral/50 ${
                      errors.name ? "border-neet-error focus:border-neet-error" : ""
                    }`}
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-neet-error bg-neet-neutral/50 border border-neet-error/30 px-3 py-1.5 text-sm mt-2 rounded-lg">
                    ⚠️ {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text pb-1 font-semibold text-neet-accent">Email Address</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-neet-primary/60 group-hover:text-neet-secondary transition-colors duration-300" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`input w-full pl-12 pr-4 py-2.5 bg-neet-base-100 border-2 border-neet-base-200/50 rounded-xl hover:border-neet-secondary/50 focus:border-neet-secondary focus:bg-neet-base-100 transition-all duration-300 text-neet-neutral placeholder-neet-neutral/50 ${
                      errors.email ? "border-neet-error focus:border-neet-error" : ""
                    }`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-neet-error bg-neet-neutral/50 border border-neet-error/30 px-3 py-1.5 text-sm mt-2 rounded-lg">
                    ⚠️ {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text pb-1 font-semibold text-neet-accent">Password</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-neet-primary/60 group-hover:text-neet-secondary transition-colors duration-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`input w-full pl-12 pr-12 py-2.5 bg-neet-base-100 border-2 border-neet-base-200/50 rounded-xl hover:border-neet-secondary/50 focus:border-neet-secondary focus:bg-neet-base-100 transition-all duration-300 text-neet-neutral placeholder-neet-neutral/50 ${
                      errors.password ? "border-neet-error focus:border-neet-error" : ""
                    }`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 hover:scale-110 transition-transform duration-300"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-neet-primary/60 hover:text-neet-secondary" />
                    ) : (
                      <Eye className="h-5 w-5 text-neet-primary/60 hover:text-neet-secondary" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-neet-error bg-neet-neutral/50 border border-neet-error/30 px-3 py-1.5 text-sm mt-2 rounded-lg">
                    ⚠️ {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control pt-1">
                <button
                  type="submit"
                  className="btn w-full py-3 bg-gradient-to-r from-neet-primary to-neet-secondary hover:from-neet-secondary hover:to-neet-accent text-neet-primary-content font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed border-none"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader className="h-5 w-5 animate-spin" />
                      <span>Creating...</span>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>

            {/* Redirect Link */}
            <div className="text-center mt-6 pt-4 border-t border-neet-base-200/50">
              <p className="text-neet-accent/50 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-neet-accent hover:text-neet-base-100 transition-colors duration-300 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
