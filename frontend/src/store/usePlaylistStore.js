import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const usePlaylistStore = create((set, get) => ({
  playlists: [],
  currentPlaylist: null,
  isLoading: false,
  error: null,

  createPlaylist: async (playlistData) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post(
        "/playlist/create-playlist",
        playlistData
      );

      set((state) => ({
        playlists: [...state.playlists, res.data.playlist],
      }));

      toast.success("Playlist created successfully");
      return res.data.playlist;
    } catch (error) {
      console.error("Error creating playlist:", error);
      toast.error(error.response?.data?.error || "Failed to create playlist");
    } finally {
      set({ isLoading: false });
    }
  },

  getAllPlaylists: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get("/playlist");

      set({ playlists: res.data.playlists });
    } catch (error) {
      console.error("Error fetching playlists:", error);
      toast.error("Failed to fetch playlists");
    } finally {
      set({ isLoading: false });
    }
  },

  getPlaylistDetails: async (playlistId) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/playlist/${playlistId}`);

      // Backend now returns transformed data, so we can use it directly
      set({ currentPlaylist: res.data.playlist });

      // Debug logging
      console.log("Playlist details fetched:", res.data.playlist);
      console.log("Problems count:", res.data.playlist.problems?.length || 0);
    } catch (error) {
      console.error("Error fetching playlist details:", error);
      toast.error("Failed to fetch playlist details");
      set({
        error:
          error.response?.data?.error || "Failed to fetch playlist details",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addProblemToPlaylist: async (playlistId, problemIds) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post(
        `/playlist/${playlistId}/add-problem`,
        { problemIds }
      );

      toast.success("Problem added to playlist");

      // Refresh playlist details
      if (get().currentPlaylist?.id === playlistId) {
        await get().getPlaylistDetails(playlistId);
      }
    } catch (error) {
      console.error("Error adding problem to playlist:", error);
      toast.error(
        error.response?.data?.error || "Failed to add problem to playlist"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  removeProblemFromPlaylist: async (playlistId, problemIds) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.delete(
        `/playlist/${playlistId}/remove-problem`,
        { data: { problemIds } } // Note: DELETE requests need data in config
      );

      toast.success("Problem removed from playlist");

      // Refresh playlist details
      if (get().currentPlaylist?.id === playlistId) {
        await get().getPlaylistDetails(playlistId);
      }
    } catch (error) {
      console.error("Error removing problem from playlist:", error);
      toast.error(
        error.response?.data?.error || "Failed to remove problem from playlist"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  deletePlaylist: async (playlistId) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.delete(`/playlist/delete-playlist/${playlistId}`);
      
      set((state) => ({
        playlists: state.playlists.filter((p) => p.id !== playlistId),
      }));
      
      toast.success("Playlist deleted successfully");
      return res.data;
    } catch (error) {
      console.error("Error deleting playlist:", error);
      let errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        "Failed to delete playlist";
      
      if (error.response?.status === 404) {
        errorMessage = "Playlist not found";
      } else if (error.response?.status === 403) {
        errorMessage = "You don't have permission to delete this playlist";
      }
      
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Clear current playlist
  clearCurrentPlaylist: () => {
    set({ currentPlaylist: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));
