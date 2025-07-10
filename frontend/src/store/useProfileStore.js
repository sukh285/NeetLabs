import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProfileStore = create((set) => ({
  profile: null,       // Contains full profile (user + stats)
  user: null,          // Optional shortcut for just basic user info
  stats: null,         // Optional shortcut for stats
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
}));
