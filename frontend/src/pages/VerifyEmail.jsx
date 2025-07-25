import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Loader, Mail } from "lucide-react";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setStatus("Token missing");
        setLoading(false);
        setShowResend(true);
        return;
      }

      try {
        const res = await axiosInstance.get(`/auth/verify-email?token=${token}`);
        toast.success("Email verified! You can now log in.");
        setStatus("success");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        console.error("Email verification failed:", err);
        setStatus("Verification failed or token expired");
        setShowResend(true);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const handleResend = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setResending(true);
    try {
      const res = await axiosInstance.post("/auth/resend-verification-token", { email });
      toast.success("Verification email resent!");
    } catch (err) {
      console.error("Resend error:", err);
      const msg = err?.response?.data?.error || "Resend failed";
      toast.error(msg);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-neet-neutral text-neet-base-100 px-4">
      {loading ? (
        <div className="flex flex-col items-center gap-3">
          <Loader className="animate-spin h-6 w-6" />
          <p>Verifying your email...</p>
        </div>
      ) : (
        <div className="text-center max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-3">{status}</h2>

          {status === "success" && (
            <p className="text-neet-accent">Redirecting to login...</p>
          )}

          {showResend && (
            <div className="mt-6 space-y-4">
              <p className="text-neet-accent/80 text-sm">
                Didn’t receive or expired token? Enter your email to resend the verification link.
              </p>
              <div className="flex items-center bg-neet-base-100 rounded-xl px-3 py-2">
                <Mail className="w-5 h-5 text-neet-primary mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent outline-none text-neet-neutral placeholder-neet-neutral/80"
                />
              </div>
              <button
                onClick={handleResend}
                disabled={resending}
                className="btn w-full py-2 bg-neet-primary text-white rounded-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {resending ? "Resending..." : "Resend Verification Email"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
