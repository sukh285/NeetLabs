import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";

import { useProblemStore } from "../store/useProblemStore";
import ProblemTable from "../components/ProblemTable";

const AllProblems = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, []);


  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="flex justify-center items-center text-2xl font-bold mb-4 mt-10">All Problems Table</h1>

      {/* ✅ Conditional rendering */}
      {isProblemsLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <ProblemTable problems={problems}/>
      )}
    </div>
  );
};

export default AllProblems;
