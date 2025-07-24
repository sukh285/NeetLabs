import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loader2, ListMusic, ArrowLeft, ListCheckIcon, Trash2, MoreVertical } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import PlaylistTable from "../components/PlaylistTable";
import ProgressBar from "../templates/ProgressBar";
import { useAuthStore } from "../store/useAuthStore";
import Divider from "../templates/Divider";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const { getPlaylistDetails, currentPlaylist, isLoading, deletePlaylist } = usePlaylistStore();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (playlistId) getPlaylistDetails(playlistId);
    // eslint-disable-next-line
  }, [playlistId]);

  const handleDeletePlaylist = async () => {
    try {
      await deletePlaylist(playlistId);
      navigate("/playlists");
    } catch (error) {
      console.error("Error deleting playlist:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const canDeletePlaylist = () => {
    if (!authUser || !currentPlaylist) return false;
    
    // Admins can delete any playlist
    if (authUser.role === "ADMIN") return true;
    
    // Non-admins can only delete their own custom playlists
    return (
      currentPlaylist.accessLevel === "CUSTOM" && 
      currentPlaylist.createdBy?.id === authUser.id
    );
  };

  if (isLoading || !currentPlaylist) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-neet-accent/20 border-t-neet-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-neet-secondary rounded-full animate-spin animate-reverse"></div>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-neet-base-100 mb-2">
            Loading Playlist
          </h3>
          <p className="text-neet-accent/60">Fetching playlist details...</p>
        </div>
      </div>
    );
  }

  const { name, description, createdBy, problems = [] } = currentPlaylist || {};
  const solvedCount = problems.filter((problem) =>
    problem.solvedProblems?.some((entry) => entry.userId === authUser.id)
  ).length;

  const totalCount = problems.length;
  const progressPercent = Math.floor((solvedCount / totalCount) * 100 || 0);

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-neet-neutral via-neet-neutral-focus to-neet-neutral">
      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeletePlaylist}
        title="Delete Playlist?"
        message="Are you sure you want to delete this playlist? This action cannot be undone."
      />

      {/* Fixed Back Button - positioned absolutely at top */}
      <div className="fixed mt-20 pl-5 top-10 left-4 z-50 sm:top-10 sm:left-6">
        <Link
          to="/playlists"
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-neet-neutral/80 backdrop-blur-md border border-neet-accent/20 hover:bg-neet-primary/10 hover:border-neet-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5 text-neet-primary group-hover:text-neet-primary/80 transition-colors" />
          <span className="text-neet-base-100 font-medium">Back to Playlists</span>
        </Link>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section - added top padding to account for fixed back button */}
        <div className="relative pt-20 pb-4 text-center sm:pt-24">
          <div className="absolute inset-0 bg-gradient-to-r from-neet-primary/5 via-neet-secondary/5 to-neet-accent/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center justify-center gap-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-neet-neutral/40 backdrop-blur-xl rounded-full border border-neet-accent/20 mb-6">
                <ListCheckIcon className="w-5 h-5 text-neet-primary" />
                <span className="text-neet-accent/80 font-medium">{name}</span>
              </div>
              
              {/* Delete Button (conditionally rendered) */}
              {canDeletePlaylist() && (
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="group flex items-center gap-2 px-4 py-3 bg-neet-neutral/40 backdrop-blur-xl rounded-full border border-neet-accent/20 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 mb-6"
                  title="Delete playlist"
                >
                  <Trash2 className="w-5 h-5 text-neet-accent/80 group-hover:text-red-500 transition-colors" />
                </button>
              )}
            </div>
            
            <p className="text-sm text-neet-accent/70 max-w-2xl mx-auto leading-relaxed mb-2">
              {description || "No description provided."}
            </p>
            <div className="text-xs text-neet-accent/60 mb-2">
              Created by:{" "}
              <span className="font-semibold text-neet-base-100">
                {createdBy?.username || "Unknown"}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar label={`Solved Problems: ${solvedCount} of ${totalCount}`} percentage={progressPercent} />
        </div>

        <Divider />

        {/* Problems Table Section */}
        <div className="pb-16">
          <PlaylistTable problems={problems} playlistId={playlistId} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;