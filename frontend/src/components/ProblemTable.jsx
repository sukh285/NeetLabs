import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PencilIcon,
  TrashIcon,
  Plus,
  Loader2,
  Search,
  CheckCircle2,
  Circle,
  PlusCircle,
} from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";

const ProblemTable = ({
  problems,
  filters,
  onOpenCreateModal,
  onOpenAddToPlaylist,
  onOpenDeleteModal,
}) => {
  const { authUser } = useAuthStore();

  const { difficulty, selectedTags, status } = filters;

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Compute filteredProblems immediately, but only render them after 1.5s delay
  const computedFilteredProblems = useMemo(() => {
    return (problems || [])
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) =>
        selectedTags.length === 0
          ? true
          : selectedTags.some((tag) => p.tags?.includes(tag))
      )
      .filter((p) =>
        difficulty.length === 0 ? true : difficulty.includes(p.difficulty)
      )
      .filter((p) => {
        if (status === "SOLVED")
          return p.solvedProblems?.some((u) => u.userId === authUser?.id);
        if (status === "UNSOLVED")
          return !p.solvedProblems?.some((u) => u.userId === authUser?.id);
        return true;
      });
  }, [problems, search, difficulty, selectedTags, status, authUser]);

  const [filteredProblems, setFilteredProblems] = useState(
    computedFilteredProblems
  );
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(true);
    const timeout = setTimeout(() => {
      setFilteredProblems(computedFilteredProblems);
      setIsFiltering(false);
    }, 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [computedFilteredProblems]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const getDifficultyBadgeClasses = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "badge badge-success badge-sm font-semibold text-green-800 bg-green-400 border-green-800";
      case "MEDIUM":
        return "badge badge-warning badge-sm font-semibold text-yellow-900 bg-yellow-400 border-yellow-800";
      case "HARD":
        return "badge badge-error badge-sm font-semibold text-red-800 bg-red-400 border-red-800";
      default:
        return "badge badge-neutral badge-sm font-semibold text-gray-700 bg-gray-400 border-gray-800";
    }
  };

  const TagsDisplay = ({ tags }) => {
    if (!tags || tags.length === 0) return null;

    const displayTags = tags.slice(0, 2);
    const remainingTags = tags.slice(2);

    return (
      <div className="flex items-center gap-1 flex-wrap font-inter">
        {displayTags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs font-medium rounded-md bg-neet-neutral/40 text-neet-accent/80 border border-neet-accent/20"
          >
            {tag}
          </span>
        ))}
        {remainingTags.length > 0 && (
          <div className="relative group">
            <span className="px-2 py-1 text-xs font-medium rounded-md bg-neet-accent/10 text-neet-accent cursor-pointer hover:bg-neet-accent/20 transition-colors duration-200 border border-neet-accent/30">
              +{remainingTags.length} more
            </span>
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50 min-w-max">
              <div className="bg-neet-neutral/95 backdrop-blur-xl rounded-lg p-3 shadow-2xl border border-neet-accent/20">
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {remainingTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium rounded-md bg-neet-accent/20 text-neet-accent/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      className="w-full mt-10 bg-neet-neutral/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-neet-accent/10"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-6">
        <p className="text-neet-accent/60 text-sm shrink-0">
          {filteredProblems.length} problem
          {filteredProblems.length !== 1 ? "s" : ""} found
        </p>

        <div className="flex-1 relative w-full max-w-md">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neet-accent/50 w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full pl-8 pr-3 py-2 text-sm bg-neet-neutral/40 border border-neet-accent/20 rounded-lg text-neet-base-100 placeholder-neet-accent/50 focus:border-neet-accent/50 focus:outline-none focus:ring-2 focus:ring-neet-accent/20 transition-all duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="btn bg-gradient-to-r from-neet-primary to-neet-secondary hover:from-neet-secondary hover:to-neet-accent text-neet-primary-content font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl border-none gap-2"
          onClick={onOpenCreateModal}
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-neet-neutral/30 backdrop-blur-sm border border-neet-accent/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neet-neutral/50 backdrop-blur-sm">
              <tr>
                <th className="text-left py-4 px-6">Status</th>
                <th className="text-left py-4 px-6">Problem</th>
                <th className="text-left py-4 px-6">Tags</th>
                <th className="text-left py-4 px-6">Difficulty</th>
                <th className="text-left py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neet-accent/10">
              {isFiltering ? (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-neet-accent/10 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-neet-accent/50 animate-spin" />
                      </div>
                      <h3 className="text-neet-base-100 font-medium mb-1">
                        Filtering problems...
                      </h3>
                      <p className="text-neet-accent/60 text-sm">
                        Please wait while we apply your filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : paginatedProblems.length > 0 ? (
                paginatedProblems.map((problem) => {
                  const isSolved = problem.solvedProblems.some(
                    (u) => u.userId === authUser?.id
                  );
                  return (
                    <tr key={problem.id} className="hover:bg-neet-neutral/20">
                      <td className="py-4 px-6">
                        {isSolved ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-neet-accent/40" />
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          to={`/problem/${problem.id}`}
                          className="text-neet-base-100 hover:text-neet-primary font-medium"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <TagsDisplay tags={problem.tags} />
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={getDifficultyBadgeClasses(
                            problem.difficulty
                          )}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {authUser?.role === "ADMIN" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => onOpenDeleteModal(problem)}
                                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-110"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                              <Link
                                to={`/update-problem/${problem.id}`}
                                className="p-2 rounded-lg bg-neet-accent/20 hover:bg-neet-accent/30 text-neet-accent/60 transition-all duration-200 hover:scale-110"
                                title="Edit Problem"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </Link>
                            </div>
                          )}

                          <button
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neet-accent/10 hover:bg-neet-accent/20 text-neet-accent hover:text-neet-base-100 transition-all duration-200 text-sm font-medium border border-neet-accent/20 hover:border-neet-accent/40"
                            onClick={() => onOpenAddToPlaylist(problem.id)}
                          >
                            <PlusCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">
                              Add to Playlist
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-neet-accent/10 flex items-center justify-center">
                        <Search className="w-8 h-8 text-neet-accent/50" />
                      </div>
                      <h3 className="text-neet-base-100 font-medium mb-1">
                        No problems found
                      </h3>
                      <p className="text-neet-accent/60 text-sm">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-neet-accent/60">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredProblems.length)} of{" "}
          {filteredProblems.length} problems
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-neet-neutral/40 text-neet-base-100 border border-neet-accent/20"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                page === currentPage
                  ? "bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-primary-content"
                  : "bg-neet-neutral/40 text-neet-base-100"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-4 py-2 rounded-lg bg-neet-neutral/40 text-neet-base-100 border border-neet-accent/20"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemTable;
