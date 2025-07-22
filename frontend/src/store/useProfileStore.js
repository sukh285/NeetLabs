import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProfileStore = create((set) => ({
  profile: null,
  user: null,
  stats: null,
  isLoading: false,

  fetchProfile: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/auth/profile");

      set({
        profile: res.data,
        user: res.data.user,
        stats: res.data.stats,
      });
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProfile: async () => {
    try {
      await axiosInstance.delete("/auth/profile");
      set({ profile: null, user: null, stats: null });
      toast.success("Profile deleted successfully.");
      window.location.href = "/"; // Or navigate using your router
    } catch (error) {
      console.error("Failed to delete profile:", error);
      toast.error("Failed to delete profile.");
    }
  },
}));
