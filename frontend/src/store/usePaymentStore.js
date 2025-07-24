import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./useAuthStore";

const useHandlePayment = () => {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate();

  const handlePayment = async (planKey) => {
    try {
      // Step 1: Create order on backend
      const res = await axiosInstance.post("/payment/create-order", {
        planKey,
      });

      const { orderId, amount } = res.data;

      if (!orderId) {
        toast.success("Switched to FREE plan!");
        return;
      }

      // Step 2: Open Razorpay Checkout
      const razorpay = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "NeetLabs",
        description: `Subscribe to ${planKey} Plan`,
        order_id: orderId,

        handler: async (res) => {
          console.log("Payment Success Response", res);

          try {
            // Step 3: Verify payment on backend
            const verifyRes = await axiosInstance.post("/payment/verify", {
              order_id: res.razorpay_order_id,
              payment_id: res.razorpay_payment_id,
              signature: res.razorpay_signature,
              planKey
            });

            if (verifyRes.data.success) {
              toast.success("Payment verified & plan activated!");
              // Optional: logout user and ask to login again
              await logout()

              toast.success("Payment verified! Please login again")
              navigate("/login")
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Something went wrong during verification.");
          }
        },
        prefill: {
          name: "", // Optional
          email: "", // Optional
        },
        theme: {
          color: "#FF9800",
        },
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment failed. Try again.");
    }
  };

  return handlePayment;
};

export default useHandlePayment;
