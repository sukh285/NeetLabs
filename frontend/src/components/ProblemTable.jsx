import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  PencilIcon,
  TrashIcon,
  Plus,
  Loader2,
  Search,
  Filter,
  ChevronDown,
  Tag,
  CheckCircle2,
  Circle,
  PlusCircle, // Add icon for "Add to Playlist"
} from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";
import { useActionStore } from "../store/useActionStore";
import { usePlaylistStore } from "../store/usePlaylistStore";
import AddToPlaylist from "./AddToPlaylist";
import CreatePlaylistModal from "./CreatePlaylistModal";

// Simple confirmation modal component
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-neet-neutral font-inter rounded-xl shadow-2xl p-6 w-full max-w-xs border border-neet-accent/20">
        <h3 className="text-lg font-semibold text-neet-base-100 mb-2">Delete Problem?</h3>
        <p className="text-neet-accent/70 mb-6 text-sm">
          Are you sure you want to delete this problem? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-neet-neutral/80 text-neet-base-100 hover:bg-black/30 hover:text-neet-primary transition-all duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ProblemTable = ({ problems }) => {
  const { authUser } = useAuthStore();
  const { isDeletingProblem, onDeleteProblem } = useActionStore();
  const { createPlaylist } = usePlaylistStore();

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  // For delete confirmation modal
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [problemIdToDelete, setProblemIdToDelete] = useState(null);

  const difficulties = ["EASY", "MEDIUM", "HARD"];

  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  // Show confirmation modal before deleting
  const handleDeleteClick = (id) => {
    setProblemIdToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  // Called when user confirms deletion
  const handleConfirmDelete = async () => {
    if (!problemIdToDelete) return;
    try {
      await onDeleteProblem(problemIdToDelete);
      setIsConfirmDeleteOpen(false);
      setProblemIdToDelete(null);
      // After successful deletion, reload the page
      window.location.reload();
    } catch (error) {
      // Optionally handle error (e.g., show a toast)
      // eslint-disable-next-line no-console
      console.error("Failed to delete problem:", error);
      setIsConfirmDeleteOpen(false);
      setProblemIdToDelete(null);
    }
  };

  // Called when user cancels deletion
  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setProblemIdToDelete(null);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  // Custom badge color classes for darker text
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
    <div className="w-full mt-10 bg-neet-neutral/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-neet-accent/10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-limelight font-bold text-neet-base-100 mb-2">Problems</h2>
          <p className="text-neet-accent/60 text-sm">
            {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <button
          className="btn bg-gradient-to-r from-neet-primary to-neet-secondary hover:from-neet-secondary hover:to-neet-accent text-neet-primary-content font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl border-none gap-2"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {/* Filters - made smaller */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neet-accent/50 w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full pl-8 pr-3 py-2 text-sm bg-neet-neutral/40 border border-neet-accent/20 rounded-lg text-neet-base-100 placeholder-neet-accent/50 focus:border-neet-accent/50 focus:outline-none focus:ring-2 focus:ring-neet-accent/20 transition-all duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neet-accent/50 w-3.5 h-3.5" />
          <select
            className="w-full pl-8 pr-8 py-2 text-sm bg-neet-neutral/40 border border-neet-accent/20 rounded-lg text-neet-base-100 focus:border-neet-accent/50 focus:outline-none focus:ring-2 focus:ring-neet-accent/20 transition-all duration-300 appearance-none"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="ALL">All Difficulties</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neet-accent/50 w-3.5 h-3.5 pointer-events-none" />
        </div>

        <div className="relative">
          <Tag className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neet-accent/50 w-3.5 h-3.5" />
          <select
            className="w-full pl-8 pr-8 py-2 text-sm bg-neet-neutral/40 border border-neet-accent/20 rounded-lg text-neet-base-100 focus:border-neet-accent/50 focus:outline-none focus:ring-2 focus:ring-neet-accent/20 transition-all duration-300 appearance-none"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="ALL">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neet-accent/50 w-3.5 h-3.5 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-neet-neutral/30 backdrop-blur-sm border border-neet-accent/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neet-neutral/50 backdrop-blur-sm">
              <tr>
                <th className="text-left py-4 px-6 text-neet-accent/80 font-semibold text-sm uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-6 max-w-0.5 text-neet-accent/80 font-semibold text-sm uppercase tracking-wider">
                  Problem
                </th>
                <th className="text-left py-4 px-6 text-neet-accent/80 font-semibold text-sm uppercase tracking-wider">
                  Tags
                </th>
                <th className="text-left py-4 px-6 text-neet-accent/80 font-semibold text-sm uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="text-left py-4 px-6 text-neet-accent/80 font-semibold text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neet-accent/10">
              {paginatedProblems.length > 0 ? (
                paginatedProblems.map((problem, index) => {
                  const isSolved = problem.solvedProblems.some(
                    (user) => user.userId === authUser?.id
                  );
                  return (
                    <tr
                      key={problem.id}
                      className="hover:bg-neet-neutral/20 transition-colors duration-200 group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          {isSolved ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-neet-accent/40" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          to={`/problem/${problem.id}`}
                          className="text-neet-base-100 hover:text-neet-primary transition-colors duration-200 font-medium group-hover:underline"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <TagsDisplay tags={problem.tags} />
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={getDifficultyBadgeClasses(problem.difficulty)}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {authUser?.role === "ADMIN" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDeleteClick(problem.id)}
                                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-110"
                              >
                                {isDeletingProblem && problemIdToDelete === problem.id ? (
                                  <Loader2 className="animate-spin h-4 w-4" />
                                ) : (
                                  <TrashIcon className="w-4 h-4" />
                                )}
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
                            onClick={() => handleAddToPlaylist(problem.id)}
                          >
                            <PlusCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">Add to Playlist</span>
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
                      <div>
                        <h3 className="text-neet-base-100 font-medium mb-1">No problems found</h3>
                        <p className="text-neet-accent/60 text-sm">Try adjusting your search or filter criteria</p>
                      </div>
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
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProblems.length)} of {filteredProblems.length} problems
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-neet-neutral/40 hover:bg-neet-neutral/60 text-neet-base-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-neet-accent/20"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  page === currentPage
                    ? "bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-primary-content"
                    : "bg-neet-neutral/40 hover:bg-neet-neutral/60 text-neet-base-100"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="px-4 py-2 rounded-lg bg-neet-neutral/40 hover:bg-neet-neutral/60 text-neet-base-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-neet-accent/20"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />

      <AddToPlaylist
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ProblemTable;