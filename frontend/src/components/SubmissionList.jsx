import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
} from "lucide-react";

const SubmissionsList = ({ submissions, isLoading }) => {
  // Helper function to safely parse JSON strings
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };

  // Helper function to calculate average memory usage
  const calculateAverageMemory = (memoryData) => {
    const memoryArray = safeParse(memoryData).map((m) =>
      parseFloat(m.split(" ")[0])
    );
    if (memoryArray.length === 0) return 0;
    return (
      memoryArray.reduce((acc, curr) => acc + curr, 0) / memoryArray.length
    );
  };

  // Helper function to calculate average runtime
  const calculateAverageTime = (timeData) => {
    const timeArray = safeParse(timeData).map((t) =>
      parseFloat(t.split(" ")[0])
    );
    if (timeArray.length === 0) return 0;
    return timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg text-neet-primary"></span>
      </div>
    );
  }

  // No submissions state
  if (!submissions?.length) {
    return (
      <div className="text-center p-8">
        <div className="text-neet-base-100/70">No submissions yet</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => {
        const avgMemory = calculateAverageMemory(submission.memory);
        const avgTime = calculateAverageTime(submission.time);

        return (
          <div
            key={submission.id}
            className="rounded-2xl bg-neet-neutral shadow-lg border border-neet-accent/10 transition-shadow"
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                {/* Left Section: Status and Language */}
                <div className="flex items-center gap-4">
                  {submission.status === "Accepted" ? (
                    <div className="flex items-center gap-2 text-neet-success font-semibold">
                      <CheckCircle2 className="w-6 h-6" />
                      <span>Accepted</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-neet-error font-semibold">
                      <XCircle className="w-6 h-6" />
                      <span>{submission.status}</span>
                    </div>
                  )}
                  <span className="px-2 py-1 text-xs font-medium rounded-md bg-neet-neutral/40 text-neet-accent/80 border border-neet-accent/20">
                    {submission.language}
                  </span>
                </div>

                {/* Right Section: Runtime, Memory, and Date */}
                <div className="flex items-center gap-6 text-neet-base-100/70 font-inter">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-neet-primary" />
                    <span>{avgTime.toFixed(3)} s</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Memory className="w-4 h-4 text-neet-primary" />
                    <span>{(avgMemory / 1024).toFixed(2)} MB</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-neet-primary" />
                    <span>
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionsList;
