import React, { useEffect, useRef } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
} from "lucide-react";

import { useConfettiCannons } from "../hooks/useConfettiCannons";
import { useExecutionStore } from "../store/useExecutionStore";

const SubmissionResults = ({ submission }) => {
  const { fireCannons } = useConfettiCannons();
  const lastAcceptedId = useRef(null);

  const justSubmitted = useExecutionStore((state) => state.justSubmitted);
  const resetJustSubmitted = useExecutionStore(
    (state) => state.resetJustSubmitted
  );

  useEffect(() => {
    if (submission?.status === "Accepted" && submission?.id && justSubmitted) {
      fireCannons();
      resetJustSubmitted(); // prevent firing again on remount
    }
  }, [submission, justSubmitted, fireCannons, resetJustSubmitted]);

  // Parse stringified arrays safely and filter out null/undefined
  const memoryArr = JSON.parse(submission.memory || "[]").filter(Boolean);
  const timeArr = JSON.parse(submission.time || "[]").filter(Boolean);

  // Calculate averages with safe fallback
  const avgMemory = memoryArr.length
    ? memoryArr.map((m) => parseFloat(m)).reduce((a, b) => a + b, 0) /
      memoryArr.length
    : null;

  const avgTime = timeArr.length
    ? timeArr.map((t) => parseFloat(t)).reduce((a, b) => a + b, 0) /
      timeArr.length
    : null;

  const passedTests = submission.testCases.filter((tc) => tc.passed).length;
  const totalTests = submission.testCases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className="space-y-8">
      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-neet-neutral shadow-lg border border-neet-accent/10">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-neet-accent/80 mb-1">
              Status
            </h3>
            <div
              className={`text-lg font-bold font-inter ${
                submission.status === "Accepted"
                  ? "text-neet-success"
                  : "text-neet-error"
              }`}
            >
              {submission.status}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-neet-neutral shadow-lg border border-neet-accent/10">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-neet-accent/80 mb-1">
              Success Rate
            </h3>
            <div className="text-lg font-bold font-inter text-neet-base-100">
              {successRate.toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-neet-neutral shadow-lg border border-neet-accent/10">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-neet-accent/80 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-neet-primary" />
              Avg. Runtime
            </h3>
            <div className="text-lg font-bold font-inter text-neet-base-100">
              {avgTime !== null ? `${avgTime.toFixed(3)} s` : "N/A"}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-neet-neutral shadow-lg border border-neet-accent/10">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-neet-accent/80 mb-1 flex items-center gap-2">
              <Memory className="w-4 h-4 text-neet-primary" />
              Avg. Memory
            </h3>
            <div className="text-lg font-bold font-inter text-neet-base-100">
              {avgMemory !== null ? `${avgMemory.toFixed(0)} KB` : "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* Test Cases Results */}
      <div className="rounded-2xl bg-neet-neutral shadow-xl border border-neet-accent/10">
        <div className="p-6">
          <h2 className="text-lg font-bold text-neet-base-100 mb-4">
            Test Cases Results
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full rounded-xl overflow-hidden bg-neet-neutral/30 border border-neet-accent/10">
              <thead className="bg-neet-neutral/50">
                <tr>
                  <th className="text-neet-accent/80 font-semibold text-sm uppercase tracking-wider py-4 px-6">
                    Status
                  </th>
                  <th className="text-neet-accent/80 font-semibold text-sm uppercase tracking-wider py-4 px-6">
                    Expected Output
                  </th>
                  <th className="text-neet-accent/80 font-semibold text-sm uppercase tracking-wider py-4 px-6">
                    Your Output
                  </th>
                  <th className="text-neet-accent/80 font-semibold text-sm uppercase tracking-wider py-4 px-6">
                    Memory
                  </th>
                  <th className="text-neet-accent/80 font-semibold text-sm uppercase tracking-wider py-4 px-6">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {submission.testCases.map((testCase) => (
                  <tr
                    key={testCase.id || testCase.testCase}
                    className="border-t border-neet-accent/10 hover:bg-neet-neutral/20 transition-colors"
                  >
                    <td className="py-4 px-6">
                      {testCase.passed ? (
                        <div className="flex items-center gap-2 text-neet-success font-semibold">
                          <CheckCircle2 className="w-5 h-5" />
                          Passed
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-neet-error font-semibold">
                          <XCircle className="w-5 h-5" />
                          Failed
                        </div>
                      )}
                    </td>
                    <td className="font-mono text-neet-base-100 py-4 px-6 bg-neet-neutral/20 whitespace-pre-wrap">
                      {testCase.expected}
                    </td>
                    <td className="font-mono text-neet-base-100 py-4 px-6 bg-neet-neutral/20 whitespace-pre-wrap">
                      {testCase.stdout || "null"}
                    </td>
                    <td className="py-4 px-6">{testCase.memory || "N/A"}</td>
                    <td className="py-4 px-6">{testCase.time || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionResults;
