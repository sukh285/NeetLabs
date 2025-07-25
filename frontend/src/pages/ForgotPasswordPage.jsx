// pages/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Mail, Loader } from "lucide-react";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      toast.success("Reset link sent to your email");
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to send reset link";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-neet-neutral px-4 text-neet-base-100">
      <form onSubmit={handleSubmit} className="space-y-6 bg-neet-base-100 p-6 rounded-xl shadow-xl w-full max-w-sm text-neet-neutral">
        <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
        <p className="text-sm text-neet-neutral/80">
          Enter your registered email address to receive a password reset link.
        </p>
        <div className="flex items-center bg-white rounded-xl px-3 py-2 border">
          <Mail className="w-5 h-5 text-neet-primary mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none text-neet-neutral placeholder-neet-neutral/50 bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn w-full py-2 bg-neet-primary text-white rounded-xl hover:scale-105 active:scale-95 transition"
        >
          {loading ? <Loader className="animate-spin w-5 h-5" /> : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
