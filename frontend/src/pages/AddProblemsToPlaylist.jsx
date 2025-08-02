import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useProblemStore } from "../store/useProblemStore";
import { useAuthStore } from "../store/useAuthStore";
import ProblemFilters from "../components/ProblemFilters";
import { Plus, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const AddProblemsToPlaylist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const {
    currentPlaylist,
    getPlaylistDetails,
    addProblemToPlaylist,
    isLoading: playlistLoading,
  } = usePlaylistStore();

  const { problems, getAllProblems } = useProblemStore();
  const { authUser } = useAuthStore();

  const [selectedProblems, setSelectedProblems] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [solvedStatus, setSolvedStatus] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (playlistId) {
      getPlaylistDetails(playlistId);
    }
    getAllProblems();
  }, [playlistId]);

  const existingProblemIds = useMemo(() => {
    return new Set(currentPlaylist?.problems?.map((p) => p.id));
  }, [currentPlaylist]);

  const filteredProblems = useMemo(() => {
    return problems
      .map((p) => ({ ...p, alreadyInPlaylist: existingProblemIds.has(p.id) }))
      .filter((p) => {
        const diffMatch =
          selectedDifficulties.length === 0 || selectedDifficulties.includes(p.difficulty);
        const solvedMatch =
          solvedStatus === "" ||
          (solvedStatus === "SOLVED"
            ? p.solvedProblems?.some((entry) => entry.userId === authUser.id)
            : !p.solvedProblems?.some((entry) => entry.userId === authUser.id));
        const tagMatch = selectedTags.length === 0 || p.tags?.some((tag) => selectedTags.includes(tag));
        return diffMatch && solvedMatch && tagMatch;
      });
  }, [problems, selectedDifficulties, solvedStatus, selectedTags, authUser.id, existingProblemIds]);

  const toggleProblem = (id) => {
    setSelectedProblems((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const toAdd = filteredProblems.filter((p) => !p.alreadyInPlaylist).map((p) => p.id);
    setSelectedProblems(toAdd);
  };

  const handleClearSelection = () => {
    setSelectedProblems([]);
  };

  const handleSubmit = async () => {
    const newProblems = selectedProblems.filter((id) => !existingProblemIds.has(id));
    if (newProblems.length === 0) {
      toast.error("No new problems selected to add.");
      return;
    }

    await addProblemToPlaylist(playlistId, newProblems);
    toast.success("Problems added to playlist!");
    navigate(`/playlist/${playlistId}`);
  };

  if (playlistLoading || !currentPlaylist) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-neet-accent/20 border-t-neet-primary rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-neet-accent/60">Loading playlist data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neet-neutral font-inter p-6">
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
                className={`flex items-center justify-between p-4 rounded-lg border mb-2 ${
                  problem.alreadyInPlaylist
                    ? "bg-neet-neutral/10 text-neet-base-300 border-neet-accent/10 cursor-not-allowed"
                    : "bg-neet-neutral/20 hover:bg-neet-primary/80 text-neet-base-100 border-neet-accent/20 cursor-pointer"
                }`}
              >
                <span className="text-sm font-medium">
                  {problem.title}
                  {problem.alreadyInPlaylist && (
                    <span className="ml-2 text-xs text-neet-accent/60">(Already Added)</span>
                  )}
                </span>
                <input
                  type="checkbox"
                  disabled={problem.alreadyInPlaylist}
                  checked={problem.alreadyInPlaylist || selectedProblems.includes(problem.id)}
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
