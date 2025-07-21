import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

export const useAiUsageStatus = () => {
  const [usageStatus, setUsageStatus] = useState(null);
  const [loadingUsage, setLoadingUsage] = useState(true);

  const fetchUsageStatus = async () => {
    try {
      setLoadingUsage(true);
      const response = await axiosInstance.get("/ai/usage-status");
      setUsageStatus(response.data);
    } catch (error) {
      console.error("Failed to fetch usage status:", error);
      setUsageStatus({
        remaining: "?",
        total: "?",
        used: "?",
        isAdmin: false,
      });
    } finally {
      setLoadingUsage(false);
    }
  };

  useEffect(() => {
    fetchUsageStatus();
  }, []);

  return {
    usageStatus,
    loadingUsage,
    refreshUsageStatus: fetchUsageStatus,
  };
};
