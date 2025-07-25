import React, { useEffect, useState } from "react";
import { Code } from "lucide-react";
import { useProblemStore } from "../store/useProblemStore";
import ProblemTable from "../components/ProblemTable";
import ProblemFilters from "../components/ProblemFilters";
import { HashLoader } from "react-spinners";
import Divider from "../templates/Divider";
import { usePlaylistStore } from "../store/usePlaylistStore";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import AddToPlaylist from "../components/AddToPlaylist";

const AllProblems = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();
  const [showLoading, setShowLoading] = useState(true);

  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [solvedStatus, setSolvedStatus] = useState(""); // solved | unsolved | ""
  const [selectedTags, setSelectedTags] = useState([]);

  // Playlist modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddToPlaylistOpen, setIsAddToPlaylistOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  const [problemToAdd, setProblemToAdd] = useState(null);

  const { createPlaylist, deletePlaylist, addProblemToPlaylist } =
    usePlaylistStore();

  // Create Playlist
  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  // Delete Playlist
  const handleOpenDeleteModal = (playlist) => {
    setPlaylistToDelete(playlist);
    setIsDeleteModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (playlistToDelete) {
      await deletePlaylist(playlistToDelete.id);
    }
    setIsDeleteModalOpen(false);
    setPlaylistToDelete(null);
  };

  // Add to Playlist
  const handleOpenAddToPlaylist = (problemId) => {
    setProblemToAdd(problemId);
    setIsAddToPlaylistOpen(true);
  };
  const handleCloseAddToPlaylist = () => {
    setIsAddToPlaylistOpen(false);
    setProblemToAdd(null);
  };

  useEffect(() => {
    getAllProblems();
    const timer = setTimeout(() => setShowLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const loading = isProblemsLoading || showLoading;

  const filters = {
    difficulty: selectedDifficulties,
    status: solvedStatus,
    selectedTags: selectedTags,
  };

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-neet-neutral via-neet-neutral-focus to-neet-neutral">
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-[30vh]">
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
            <div
              className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 mt-0"
            >
              <ProblemFilters
              
                selectedDifficulties={selectedDifficulties}
                setSelectedDifficulties={setSelectedDifficulties}
                solvedStatus={solvedStatus}
                setSolvedStatus={setSolvedStatus}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
              <div>
                {/* Hero Section */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-neet-accent-200 backdrop-blur-sm rounded-full border border-neet-accent/20 mb-2">
                    <Code className="w-4 h-4 text-neet-primary" />
                    <span className="text-neet-accent font-medium text-sm">
                      All Problems
                    </span>
                  </div>
                  <p className="text-xs text-center text-neet-accent/70 leading-relaxed max-w-2xl mx-auto">
                    Challenge yourself with our collection of coding problems.
                  </p>
                </div>
                {/* <Divider /> */}
                <ProblemTable
                  problems={problems}
                  filters={{
                    difficulty: selectedDifficulties,
                    selectedTags,
                    status: solvedStatus,
                  }}
                  onOpenCreateModal={() => setIsCreateModalOpen(true)}
                  onOpenDeleteModal={handleOpenDeleteModal}
                  onOpenAddToPlaylist={handleOpenAddToPlaylist}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setPlaylistToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Playlist?"
        message={
          playlistToDelete
            ? `Are you sure you want to delete the playlist "${playlistToDelete.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this playlist? This action cannot be undone."
        }
      />

      {/* Add To Playlist Modal */}
      <AddToPlaylist
        isOpen={isAddToPlaylistOpen}
        onClose={handleCloseAddToPlaylist}
        problemId={problemToAdd}
      />
    </div>
  );
};

export default AllProblems;
