import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2, ListMusic } from "lucide-react";

import { usePlaylistStore } from "../store/usePlaylistStore";
import PlaylistTable from "../components/PlaylistTable";
import ProgressBar from "../templates/ProgressBar";
import { useAuthStore } from "../store/useAuthStore";

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const { getPlaylistDetails, currentPlaylist, isLoading } = usePlaylistStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (playlistId) getPlaylistDetails(playlistId);
    // eslint-disable-next-line
  }, [playlistId]);

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

  // ✅ Filter problems that are solved by the current user
  const solvedCount = problems.filter((problem) =>
    problem.solvedProblems?.some((entry) => entry.userId === authUser.id)
  ).length;

  const totalCount = problems.length;
  const progressPercent = Math.floor((solvedCount / totalCount) * 100 || 0);

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-neet-neutral via-neet-neutral-focus to-neet-neutral">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative pt-16 pb-4 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-neet-primary/5 via-neet-secondary/5 to-neet-accent/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-neet-neutral/40 backdrop-blur-xl rounded-full border border-neet-accent/20 mb-6">
              <ListMusic className="w-5 h-5 text-neet-primary" />
              <span className="text-neet-accent/80 font-medium">{name}</span>
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

        {/* Problems Table Section */}
        <div className="pb-16">
          <PlaylistTable problems={problems} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
