import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Loader2,
  ListMusic,
  ArrowLeft,
  ListCheckIcon,
  Trash2,
  MoreVertical,
  Share2Icon,
} from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import PlaylistTable from "../components/PlaylistTable";
import ProgressBar from "../templates/ProgressBar";
import { useAuthStore } from "../store/useAuthStore";
import Divider from "../templates/Divider";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import toast from "react-hot-toast";

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const { getPlaylistDetails, currentPlaylist, isLoading, deletePlaylist } =
    usePlaylistStore();
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


      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sticky Top Playlist Header */}
        <div className="relative top-8 rounded-2xl z-40 bg-neet-neutral/95 backdrop-blur-lg border-b border-neet-accent/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left - Back Button */}
              <div className="flex items-center gap-6">
                <Link
                  to="/playlists"
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-neet-neutral/40 border border-neet-accent/20 hover:bg-neet-primary/10 hover:border-neet-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ArrowLeft className="w-5 h-5 text-neet-primary group-hover:text-neet-primary/80 transition-colors" />
                </Link>

                {/* Playlist Name & Metadata */}
                <div>
                  <h1 className="text-xl font-inter tracking-wide font-bold text-neet-base-100">
                    {name}
                  </h1>
                  <div className="flex items-center gap-4 text-xs text-neet-accent/60 mt-1">
                    <span>
                      Created by:{" "}
                      <span className="text-neet-base-100">
                        {createdBy?.username || "Unknown"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right - Share + Optional Delete */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Playlist link copied!");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neet-neutral/40 border border-neet-accent/20 hover:bg-neet-primary/10 hover:border-neet-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl text-neet-primary"
                >
                  <Share2Icon className="w-4 h-4" />
                  <span className="text-xs font-normal">Share</span>
                </button>

                {canDeletePlaylist() && (
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="group flex items-center gap-2 px-3 py-2 bg-neet-neutral/40 backdrop-blur-xl rounded-full border border-neet-accent/20 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300"
                    title="Delete playlist"
                  >
                    <Trash2 className="w-5 h-5 text-neet-accent/80 group-hover:text-red-500 transition-colors" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Playlist Description */}
        <div className="text-sm text-neet-accent/70 max-w-2xl mx-auto mt-5 pt-10 text-center leading-relaxed">
          {description || "No description provided."}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar
            label={`Solved Problems: ${solvedCount} of ${totalCount}`}
            percentage={progressPercent}
          />
        </div>

        <Divider />

        <Link
          to={`/playlist/${playlistId}/add-problem`}
          className="btn-circle py-2 px-4 border flex items-center bg-neet-primary/80 border-neet-primary/30 text-neet-neutral hover:bg-neet-primary hover:border-neet-primary backdrop-blur-md shadow-lg transition w-fit text-sm ml-4"
        >
          <span className="font-medium">Add Problems</span>
        </Link>

        {/* Problems Table Section */}
        <div className="pb-16">
          <PlaylistTable problems={problems} playlistId={playlistId} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
