import React, { useEffect, useState } from "react";
import { Loader2, Code, Trophy, Target, Zap } from "lucide-react";

import { useProblemStore } from "../store/useProblemStore";
import ProblemTable from "../components/ProblemTable";
import Divider from "../templates/Divider";
import { HashLoader } from "react-spinners";

const AllProblems = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    getAllProblems();
    setShowLoading(true);
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const loading = isProblemsLoading || showLoading;

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-neet-neutral via-neet-neutral-focus to-neet-neutral">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative pt-16 pb-4 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-neet-primary/5 via-neet-secondary/5 to-neet-accent/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-neet-neutral/40 backdrop-blur-xl rounded-full border border-neet-accent/20 mb-6">
              <Code className="w-5 h-5 text-neet-primary" />
              <span className="text-neet-accent/80 font-medium">All Problems</span>
            </div>

            <p className="text-sm text-neet-accent/70 max-w-2xl mx-auto leading-relaxed">
              Challenge yourself with our comprehensive collection of coding
              problems. From algorithms to data structures, level up your
              programming skills.
            </p>
          </div>
        </div>

        <Divider />

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <HashLoader color="#FF9800" />
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-neet-base-100 mb-2">
                Loading Problems
              </h3>
              <p className="text-neet-accent/60">
                Fetching the latest coding challenges...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Problem Table Section */}
            <div className="pb-16">
              <ProblemTable problems={problems} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllProblems;
