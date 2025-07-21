// components/UsageDisplay.js
import { AlertCircle } from "lucide-react";

const UsageDisplay = ({ usageStatus, loadingUsage }) => {
  if (loadingUsage) {
    return (
      <div className="flex items-center gap-1 text-xs text-neet-accent/50">
        <div className="w-3 h-3 border border-neet-accent/30 border-t-neet-primary rounded-full animate-spin"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (!usageStatus) return null;

  if (usageStatus.isAdmin) {
    return (
      <div className="flex items-center gap-1 pb-1.5 text-xs justify-end">
        <div className="w-2 h-2 bg-neet-secondary rounded-full"></div>
        <span className="text-neet-accent/60">Admin</span>
        <span className="text-neet-accent/40">--</span>
        <span className="text-neet-accent/50">Unlimited requests</span>
      </div>
    );
  }

  const { remaining, total } = usageStatus;
  const isLow = remaining <= 1;
  const isEmpty = remaining <= 0;

  return (
    <div className="flex items-center gap-1 pb-1.5 text-xs justify-end">
      <div
        className={`w-2 h-2 rounded-full ${
          isEmpty ? "bg-red-400" : isLow ? "bg-yellow-400" : "bg-green-400"
        }`}
      ></div>
      <span className="text-neet-accent/60">Requests left:</span>
      <span
        className={`font-medium ${
          isEmpty
            ? "text-red-400"
            : isLow
            ? "text-yellow-400"
            : "text-neet-base-100"
        }`}
      >
        {remaining}/{total}
      </span>
    </div>
  );
};

export default UsageDisplay;
