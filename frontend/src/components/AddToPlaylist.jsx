import React, { useEffect, useState } from "react";
import { X, Loader, Plus } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useAuthStore } from "../store/useAuthStore";

const AddToPlaylist = ({ isOpen, onClose, problemId }) => {
  const { playlists, getAllPlaylists, addProblemToPlaylist, isLoading } =
    usePlaylistStore();
  const { authUser } = useAuthStore();

  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if (isOpen) {
      getAllPlaylists();
    }
  }, [isOpen, getAllPlaylists]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;

    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 font-inter bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-neet-neutral rounded-3xl shadow-2xl border border-neet-base-100/10 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-neet-base-100/10 bg-neet-neutral/90">
          <h3 className="text-lg font-limelight sm:text-xl font-bold text-neet-base-100">
            Add to Playlist
          </h3>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle hover:bg-neet-primary/10 transition"
          >
            <X className="w-5 h-5 text-neet-base-100" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Select Playlist */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-neet-accent/80">
                Select Playlist
              </span>
            </label>
            <select
              className="select select-bordered w-full bg-neet-neutral/20 border-neet-base-100/10 text-neet-base-100 focus:border-neet-primary focus:outline-none transition"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              disabled={isLoading}
            >
              <option value="">-- Choose a playlist --</option>
              {playlists
                .filter(
                  (playlist) =>
                    playlist.accessLevel === "CUSTOM" &&
                    playlist.createdBy?.id === authUser.id
                )
                .map((playlist) => (
                  <option
                    key={playlist.id}
                    value={playlist.id}
                    className="bg-neet-neutral text-neet-base-100"
                  >
                    {playlist.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn rounded-full px-5 py-2 font-medium text-neet-accent hover:text-neet-primary hover:bg-neet-primary/10 border border-neet-base-100/20 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="relative group btn rounded-full px-6 py-2.5 font-semibold shadow-lg bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-primary-content border-none hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-2"
              disabled={!selectedPlaylist || isLoading}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neet-secondary to-neet-accent opacity-40 blur rounded-full group-hover:opacity-70 transition duration-300 -z-10" />
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span className="relative">Add to Playlist</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToPlaylist;
