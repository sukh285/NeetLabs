import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { z as zod } from "zod";
import { Code, Eye, EyeOff, Loader, Lock, Mail } from "lucide-react";

import Particles from "../templates/Particles";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const SignUpSchema = zod.object({
  email: zod.string().email("Enter valid email"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  name: zod.string().min(3, "Name must be at least 3 characters"),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resending, setResending] = useState(false);

  const { signup, isSigningUp } = useAuthStore();

  const navigate = useNavigate();

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
      const success = await signup(data);
      if (success) {
        setShowVerifyModal(true); // 👈 show popup
      }
    } catch (error) {
      console.log("Signup failed -->", error);
    }
  };

  const handleResend = async () => {
    if (!resendEmail) {
      toast.error("Please enter your email");
      return;
    }

    setResending(true);
    try {
      const res = await axiosInstance.post("/auth/resend-verification-token", {
        email: resendEmail,
      });
      toast.success("Verification email resent!");
    } catch (err) {
      const msg = err?.response?.data?.error || "Resend failed";
      toast.error(msg);
    } finally {
      setResending(false);
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

      {showVerifyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-sm shadow-xl space-y-4 relative">
            <h2 className="text-xl font-bold text-neet-primary">
              Verify your email
            </h2>
            <p className="text-sm text-gray-600">
              A verification link has been sent to your email.
            </p>

            <p className="text-sm text-gray-600 mt-2">
              Didn’t receive it? Enter your email below to resend:
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="input placeholder-white text-white w-full px-4 py-2 border rounded-lg text-sm"
              value={resendEmail}
              onChange={(e) => setResendEmail(e.target.value)}
            />

            <button
              onClick={handleResend}
              disabled={resending}
              className="btn bg-neet-primary text-white w-full rounded-lg hover:scale-105 active:scale-95 transition"
            >
              {resending ? "Resending..." : "Resend Verification Email"}
            </button>

            <button
              className="btn bg-gray-200 text-gray-800 w-full rounded-lg mt-2 hover:scale-105 active:scale-95 transition"
              onClick={() => setShowVerifyModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

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
              <h1 className="text-2xl font-bold mt-2 text-neet-base-100">
                Welcome
              </h1>
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
                  <span className="label-text pb-1 font-semibold text-neet-accent">
                    Name
                  </span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Code className="h-5 w-5 text-neet-primary/60 group-hover:text-neet-secondary transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className={`input w-full pl-12 pr-4 py-2.5 bg-neet-base-100 border-2 border-neet-base-200/50 rounded-xl hover:border-neet-secondary/50 focus:border-neet-secondary focus:bg-neet-base-100 transition-all duration-300 text-neet-neutral placeholder-neet-neutral/50 ${
                      errors.name
                        ? "border-neet-error focus:border-neet-error"
                        : ""
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
                  <span className="label-text pb-1 font-semibold text-neet-accent">
                    Email Address
                  </span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-neet-primary/60 group-hover:text-neet-secondary transition-colors duration-300" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`input w-full pl-12 pr-4 py-2.5 bg-neet-base-100 border-2 border-neet-base-200/50 rounded-xl hover:border-neet-secondary/50 focus:border-neet-secondary focus:bg-neet-base-100 transition-all duration-300 text-neet-neutral placeholder-neet-neutral/50 ${
                      errors.email
                        ? "border-neet-error focus:border-neet-error"
                        : ""
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
                  <span className="label-text pb-1 font-semibold text-neet-accent">
                    Password
                  </span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-neet-primary/60 group-hover:text-neet-secondary transition-colors duration-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`input w-full pl-12 pr-12 py-2.5 bg-neet-base-100 border-2 border-neet-base-200/50 rounded-xl hover:border-neet-secondary/50 focus:border-neet-secondary focus:bg-neet-base-100 transition-all duration-300 text-neet-neutral placeholder-neet-neutral/50 ${
                      errors.password
                        ? "border-neet-error focus:border-neet-error"
                        : ""
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
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-neet-base-200/50 to-transparent" />
                <span className="mx-3 text-neet-accent/60 text-sm font-medium">
                  or join via
                </span>
                <div className="flex-grow h-px bg-gradient-to-l from-transparent via-neet-base-200/50 to-transparent" />
              </div>

              <div className="form-control pt-1 flex flex-row gap-3 w-full">
                <a
                  href="http://localhost:8080/api/v1/auth/google"
                  className="flex-1 btn py-3 bg-white text-neet-neutral border border-neet-base-200 hover:shadow-lg rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-102 font-semibold"
                  style={{ willChange: "transform" }}
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="ml-1">Google</span>
                </a>

                <a
                  href="http://localhost:8080/api/v1/auth/github"
                  className="flex-1 btn py-3 bg-[#18181b] text-white border border-[#fff]/20 hover:shadow-lg rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-102 active:scale-95 font-semibold"
                  style={{ willChange: "transform" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.931 0-1.31.47-2.381 1.236-3.221-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.653.241 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.628-5.475 5.922.43.371.823 1.102.823 2.222v3.293c0 .321.218.694.825.576 4.765-1.587 8.2-6.084 8.2-11.385 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="ml-1">GitHub</span>
                </a>
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
