// pages/ResetPasswordPage.jsx
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Lock, Loader } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Invalid or missing token.");
    if (!password || password.length < 6)
      return toast.error("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        token,
        newPassword: password,
      });

      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err) {
      const msg = err?.response?.data?.error || "Failed to reset password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-neet-neutral px-4 text-neet-base-100">
      <form onSubmit={handleReset} className="space-y-6 bg-neet-base-100 p-6 rounded-xl shadow-xl w-full max-w-sm text-neet-neutral">
        <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
        <p className="text-sm text-neet-neutral/80">
          Enter a new password for your account.
        </p>
        <div className="flex items-center bg-white rounded-xl px-3 py-2 border">
          <Lock className="w-5 h-5 text-neet-primary mr-2" />
          <input
            type="password"
            placeholder="New Password"
            className="w-full outline-none text-neet-neutral placeholder-neet-neutral/50 bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn w-full py-2 bg-neet-primary text-white rounded-xl hover:scale-105 active:scale-95 transition"
        >
          {loading ? <Loader className="animate-spin w-5 h-5" /> : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
