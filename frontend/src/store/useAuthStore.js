import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


export const useAuthStore = create((set, get) => ({
  //4 utility methods for 4 routes in auth that we have put
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  //can use react query too (why?)

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      // console.log("checkAuth response -->", res.data);

      set({ authUser: res.data.user });
    } catch (error) {
      console.log("Error checking auth:", error);
      set({ authUser: null });
      // Only show error toast if it's not a 401 (unauthorized)
      if (error.response?.status !== 401) {
        toast.error("Authentication check failed");
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  isAdmin: () => {
    const user = get().authUser;
    return user?.role === "ADMIN";
  },

  hasPlan: (allowedPlans = []) => {
    const user = get().authUser;
    if (!user) return false;
    return allowedPlans.includes(user.plan);
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      //   console.log("checkAuth response -->", res.data);

      toast.success(res.data.message);
      return true;
    } catch (error) {
      console.log("Error signing up:", error);
      set({ authUser: null });
      toast.error("Error signing up");
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },
  

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error logging in:", error);
      set({ authUser: null });
      const errorMsg = error?.response?.data?.error || "Login failed";
      toast.error(errorMsg);
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },
  

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      set({ authUser: null });

      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error logging out:", error);
      toast.error("Error logging out");
    }
  },
}));
