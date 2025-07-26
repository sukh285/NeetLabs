// pages/AddProblemsToPlaylist.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { useAuthStore } from "../store/useAuthStore";
import ProblemFilters from "../components/ProblemFilters"; // already created
import { Plus, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const AddProblemsToPlaylist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { problems, getAllProblems } = useProblemStore();
  const { authUser } = useAuthStore();

  const [selectedProblems, setSelectedProblems] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [solvedStatus, setSolvedStatus] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    getAllProblems(); // if not already fetched
  }, []);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesDifficulty =
        selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(problem.difficulty);
      const matchesSolvedStatus =
        solvedStatus === "" ||
        (solvedStatus === "SOLVED"
          ? problem.solvedProblems?.some((entry) => entry.userId === authUser.id)
          : !problem.solvedProblems?.some((entry) => entry.userId === authUser.id));
      const matchesTags =
        selectedTags.length === 0 ||
        problem.tags?.some((tag) => selectedTags.includes(tag));

      return matchesDifficulty && matchesSolvedStatus && matchesTags;
    });
  }, [problems, selectedDifficulties, solvedStatus, selectedTags, authUser.id, selectedTags]);

  const toggleProblem = (id) => {
    setSelectedProblems((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allFilteredIds = filteredProblems.map((p) => p.id);
    setSelectedProblems(allFilteredIds);
  };

  const handleClearSelection = () => {
    setSelectedProblems([]);
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post(`/playlist/${playlistId}/add-problem`, {
        problemIds: selectedProblems,
      });
      toast.success("Problems added to playlist!");
      navigate(`/playlist/${playlistId}`);
    } catch (err) {
      console.error("Failed to add problems:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-neet-neutral font-inter p-6">
      {/* Top spacing for better breathing room */}
      <div className="mb-10" />
      <div className="grid md:grid-cols-4 gap-8">
        <ProblemFilters
          selectedDifficulties={selectedDifficulties}
          setSelectedDifficulties={setSelectedDifficulties}
          solvedStatus={solvedStatus}
          setSolvedStatus={setSolvedStatus}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        <div className="md:col-span-3 bg-neet-neutral/40 p-6 rounded-2xl border border-neet-accent/20 flex flex-col">
          {/* Header with back button, title, and select/clear buttons */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center text-neet-accent hover:text-neet-base-100 transition rounded-full p-1"
                title="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-neet-base-100 text-lg font-semibold">
                Select Problems to Add
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSelectAll}
                className="btn-circle py-2 px-4 border flex items-center bg-neet-primary/80 border-neet-primary/30 text-neet-neutral hover:bg-neet-primary hover:border-neet-primary backdrop-blur-md shadow-lg transition text-sm"
              >
                Select All Filtered
              </button>
              <button
                onClick={handleClearSelection}
                className="btn-circle py-2 px-4 border flex items-center bg-neet-accent border-neet-primary/30 text-neet-neutral hover:bg-neet-primary-focus hover:border-neet-primary backdrop-blur-md shadow-lg transition text-sm"
              >
                Clear Selection
              </button>
            </div>
          </div>
          {/* Themed divider with more vertical spacing */}
          <div
            className="w-full h-px mb-8"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0) 0%, var(--color-neet-primary, #7c3aed) 50%, rgba(0,0,0,0) 100%)",
              opacity: 0.25,
            }}
          />
          <div className="grid md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto mb-8">
            {filteredProblems.map((problem) => (
              <label
                key={problem.id}
                className="flex items-center justify-between p-4 rounded-lg border border-neet-accent/10 bg-neet-neutral/20 hover:bg-neet-primary/80 transition cursor-pointer mb-2"
              >
                <span className="text-neet-base-100 text-sm font-medium">
                  {problem.title}
                </span>
                <input
                  type="checkbox"
                  checked={selectedProblems.includes(problem.id)}
                  onChange={() => toggleProblem(problem.id)}
                  className="form-checkbox accent-neet-primary"
                />
              </label>
            ))}
            {filteredProblems.length === 0 && (
              <div className="col-span-2 text-center text-neet-accent/70 py-8">
                No problems match your filters.
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={selectedProblems.length === 0}
            className="btn-circle mt-2 w-full py-3 px-4 border flex items-center justify-center bg-neet-primary/90 border-neet-primary/30 text-neet-neutral hover:bg-neet-primary hover:border-neet-primary backdrop-blur-md shadow-lg transition text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Plus className="inline w-4 h-4 mr-2" />
            Add {selectedProblems.length} Problem{selectedProblems.length !== 1 ? "s" : ""} to Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProblemsToPlaylist;
