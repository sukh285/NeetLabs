import React, { useEffect, useState } from "react";
import {
  Loader2,
  ListMusic,
  BookOpen,
  Clock,
  Users,
  List,
  ChevronRight,
  ThumbsUp,
  Music,
  Plus,
  Calendar,
  ListFilter,
  PenIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { usePlaylistStore } from "../store/usePlaylistStore";
import { useAccess } from "../hooks/useAccess";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import Divider from "../templates/Divider";
import { HashLoader } from "react-spinners";

const AllPlaylists = () => {
  const [isPlaylistsLoading, setIsPlaylistsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { playlists, getAllPlaylists, isLoading, createPlaylist } =
    usePlaylistStore();
  const { authUser, plan, isAdmin } = useAccess();

  // Fetch user playlists
  useEffect(() => {
    const fetchPlaylists = async () => {
      setIsPlaylistsLoading(true);
      try {
        await getAllPlaylists();
      } finally {
        setIsPlaylistsLoading(false);
      }
    };
    fetchPlaylists();
  }, [getAllPlaylists]);

  // All premium playlists
  const premiumPlaylists = playlists.filter((p) => p.accessLevel !== "CUSTOM");

  // For users, filter premium playlists by access level
  const accessiblePremiumPlaylists = isAdmin
    ? premiumPlaylists
    : premiumPlaylists.filter((playlist) => {
        if (playlist.accessLevel === "FREE") return true;
        if (playlist.accessLevel === "PRO" && plan !== "FREE") return true;
        if (playlist.accessLevel === "ADVANCED" && plan === "ADVANCED") return true;
        return false;
      });

  const myPlaylists = playlists.filter(
    (p) => p.accessLevel === "CUSTOM" && p.user?.id === authUser?.id
  );

  // PremiumPlaylistCard: clickable to playlist if accessible, else to pricing
  const PremiumPlaylistCard = ({ playlist }) => {
    const accessLabel =
      playlist.accessLevel === "FREE" ? "Free" : playlist.accessLevel;

    // Admins can access all, users only if access level matches
    const canAccess =
      isAdmin ||
      playlist.accessLevel === "FREE" ||
      (playlist.accessLevel === "PRO" && plan !== "FREE") ||
      (playlist.accessLevel === "ADVANCED" && plan === "ADVANCED");

    const CardContent = (
      <div className="group relative bg-neet-neutral/40 backdrop-blur-xl rounded-2xl border border-neet-accent/10 hover:border-neet-primary/30 transition-all duration-300 overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-neet-primary/5 via-transparent to-neet-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Lock or Access Label */}
        {!canAccess && (
          <div className="absolute top-4 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 shadow-lg z-10">
            Locked
          </div>
        )}

        <div className="relative p-6 h-full flex flex-col">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-neet-primary/20 to-neet-secondary/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📘
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold font-limelight text-neet-base-100 group-hover:text-neet-primary transition-colors leading-tight mb-2">
                  {playlist.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium border border-neet-primary/20 text-neet-primary bg-neet-primary/10">
                    {accessLabel}
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-neet-accent/40 group-hover:text-neet-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
          </div>

          <p className="text-sm text-neet-accent/70 mb-6 line-clamp-2 leading-relaxed flex-grow">
            {playlist.description}
          </p>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neet-accent/10 mt-auto">
            <div className="text-center">
              <BookOpen className="w-4 h-4 text-neet-accent/60 mb-1 mx-auto" />
              <p className="text-sm font-semibold text-neet-base-100">
                {playlist.problems?.length || 0}
              </p>
              <p className="text-xs text-neet-accent/60">Problems</p>
            </div>
            <div className="text-center">
              <Users className="w-4 h-4 text-neet-accent/60 mb-1 mx-auto" />
              <p className="text-sm font-semibold text-neet-base-100">
                {playlist.user?.name || "Admin"}
              </p>
              <p className="text-xs text-neet-accent/60">Created By</p>
            </div>
            <div className="text-center">
              <Calendar className="w-4 h-4 text-neet-accent/60 mb-1 mx-auto" />
              <p className="text-sm font-semibold text-neet-base-100">
                {new Date(playlist.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-neet-accent/60">Created</p>
            </div>
          </div>
        </div>
      </div>
    );

    // If accessible, wrap in Link to playlist, else to pricing page
    return canAccess ? (
      <Link
        to={`/playlist/${playlist.id}`}
        className="block h-full"
        tabIndex={0}
        aria-label={`View playlist ${playlist.name}`}
      >
        {CardContent}
      </Link>
    ) : (
      <Link
        to="/pricing"
        className="block h-full"
        tabIndex={0}
        aria-label={`Unlock playlist ${playlist.name} (go to pricing)`}
      >
        {CardContent}
      </Link>
    );
  };

  const UserPlaylistCard = ({ playlist }) => (
    <Link
      to={`/playlist/${playlist.id}`}
      className="group bg-neet-neutral/20 border border-neet-accent/10 rounded-xl hover:border-neet-primary/20 hover:bg-neet-neutral/30 transition-all duration-200 p-4 cursor-pointer block"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-neet-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <ListFilter className="w-5 h-5 text-neet-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-neet-base-100 group-hover:text-neet-primary transition-colors truncate">
                {playlist.name}
              </h3>
              {playlist.description && (
                <p className="text-sm text-neet-accent/60 mt-1 line-clamp-2">
                  {playlist.description}
                </p>
              )}
            </div>
            <ChevronRight className="w-4 h-4 text-neet-accent/40 group-hover:text-neet-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1" />
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-neet-accent/60">
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>{playlist.problems?.length || 0} problems</span>
            </div>
            {playlist.createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(playlist.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );

  const EmptyUserPlaylists = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-neet-neutral/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-8 h-8 text-neet-accent/40" />
      </div>
      <h3 className="text-lg font-medium text-neet-base-100 mb-2">
        No playlists yet
      </h3>
      <p className="text-sm text-neet-accent/60 mb-4">
        Create your first playlist to organize your favorite problems
      </p>
      <button
        className="btn btn-sm bg-neet-primary/10 hover:bg-neet-primary/20 text-neet-primary border-neet-primary/20 rounded-full"
        onClick={() => setIsCreateModalOpen(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Playlist
      </button>
    </div>
  );

  // Empty Premium Playlists component
  const EmptyPremiumPlaylists = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-neet-neutral/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <ListMusic className="w-8 h-8 text-neet-accent/40" />
      </div>
      <h3 className="text-lg font-medium text-neet-base-100 mb-2">
        No premium playlists
      </h3>
      <p className="text-sm text-neet-accent/60">
        There are currently no curated premium playlists available.
      </p>
    </div>
  );

  // Handler for creating a playlist
  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
    getAllPlaylists();
  };

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-neet-neutral via-neet-neutral-focus to-neet-neutral">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative pt-16 mb-2 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-neet-primary/5 via-neet-secondary/5 to-neet-accent/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-neet-neutral/40 backdrop-blur-xl rounded-full border border-neet-accent/20 mb-6">
              <List className="w-5 h-5 text-neet-primary" />
              <span className="text-neet-accent/80 font-medium">
                All Playlists
              </span>
            </div>
            <p className="text-sm text-neet-accent/70 max-w-2xl mx-auto leading-relaxed">
              Explore curated playlists of coding problems. Tackle topics,
              master skills, and track your progress with themed collections.
            </p>
          </div>
        </div>

        <Divider />

        {/* Loading State */}
        {isPlaylistsLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <HashLoader color="#FF9800" />
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-neet-base-100 mb-2">
                Loading Playlists
              </h3>
              <p className="text-neet-accent/60">
                Fetching curated learning paths...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Premium Playlists Grid */}
            <div className="pt-5 pb-12">
              {premiumPlaylists.length === 0 ? (
                <EmptyPremiumPlaylists />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {premiumPlaylists.map((playlist) => (
                    <PremiumPlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              )}
            </div>

            <Divider />

            {/* My Playlists Section */}
            <div className="pb-16">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <PenIcon className="w-5 h-5 text-neet-primary" />
                    <h2 className="text-xl font-semibold font-limelight text-neet-base-100">
                      My Playlists
                    </h2>
                  </div>
                  <button
                    className="btn btn-sm bg-neet-primary/10 hover:bg-neet-primary/20 text-neet-primary border-neet-primary/20 rounded-full flex items-center gap-2 ml-2"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Create New Playlist
                  </button>
                </div>
                <p className="text-sm text-neet-accent/60">
                  Your personal collection of problem playlists
                </p>
              </div>

              {/* User Playlists Loading */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin text-neet-primary" />
                    <span className="text-neet-accent/70">
                      Loading your playlists...
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  {/* User Playlists Grid */}
                  {playlists && playlists.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {myPlaylists.map((playlist) => (
                        <UserPlaylistCard
                          key={playlist.id}
                          playlist={playlist}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyUserPlaylists />
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default AllPlaylists;
