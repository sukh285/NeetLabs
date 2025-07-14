import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set, get) => ({
  isLoading: null,
  submissionsByProblem: {}, // 🔄 stores submissions per problem ID
  submissionCount: null,

  // Optional: still supports all submissions globally if needed
  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get("/submission/get-all-submissions");

      toast.success(res.data.message);

      // Optional: for admin/global view if needed
      set({ submissionsByProblem: { all: res.data.submissions } });
    } catch (error) {
      console.error("Error getting all submissions", error);
      toast.error("Error getting all submissions");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get(
        `/submission/get-submissions/${problemId}`
      );

      set((state) => ({
        submissionsByProblem: {
          ...state.submissionsByProblem,
          [problemId]: res.data.submissions,
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error getting submissions for problem", error);
      toast.error("Error getting submissions for problem");
      set({ isLoading: false });
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
