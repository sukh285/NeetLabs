import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set, get) => ({
  isLoading: null,
  submissions: [],
  submission: null,
  submissionCount: null,

  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get("/submission/get-all-submissions");

      set({ submissions: res.data.submissions });

      toast.success(res.data.message);
    } catch (error) {
      console.error("Error getting all submissions", error);
      toast.error("Error getting all submissions");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submissions/${"d773532a-3fbb-4418-9e3b-ed3636de0b87"}`
      );

      set({ submission: res.data.submissions });
    } catch (error) {
      console.error("Error getting submissions for problem", error);
      toast.error("Error getting submissions for problem");
    }
  },

  getSubmissionCountForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submissions-count/${problemId}`
      );

      set({ submissionCount: res.data.count });
    } catch (error) {
      console.error("Error getting submissions count for problem", error);
      toast.error("Error getting submissions count for problem");
    }
  },
}));
