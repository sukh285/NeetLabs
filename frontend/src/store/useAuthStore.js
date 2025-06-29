import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

export const useAuthStore = create((set) => ({
  //4 utility methods for 4 routes in auth that we have put
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  //can use react query too (why?)

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("checkAuth response -->", res.data);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async () => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      //   console.log("checkAuth response -->", res.data);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error signing up:", error);
      set({ authUser: null });
      toast.error("Error signing up");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async () => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      //   console.log("checkAuth response -->", res.data);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error logging in:", error);
      set({ authUser: null });
      toast.error("Error signing up");
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
