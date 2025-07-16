import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,
  justSubmitted: false, // NEW FLAG

  executeCode: async (
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problem_id
  ) => {
    try {
      set({ isExecuting: true, justSubmitted: false }); // reset
      const res = await axiosInstance.post("/execute-code", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problem_id,
      });

      set({
        submission: res.data.submission,
        justSubmitted: true, // set true after actual submission
      });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error executing code", error);
      toast.error("Error executing code");
    } finally {
      set({ isExecuting: false });
    }
  },

  resetJustSubmitted: () => set({ justSubmitted: false }),
  resetSubmissionState: () => set({ submission: null, justSubmitted: false }), // utility
}));

