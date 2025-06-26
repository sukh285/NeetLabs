import { db } from "../libs/db.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;

    const userId = req.user.id;

    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error while creating playlist:", error);
    return res.status(500).json({
      error: "Error while creating playlist",
    });
  }
};

export const getAllListDetails = async (req, res) => {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Playlists fetched successfully",
      playlists,
    });
  } catch (error) {
    console.error("Error while fetching playlists:", error);
    return res.status(500).json({
      error: "Error while fetching playlists",
    });
  }
};

export const getPlaylistDetails = async (req, res) => {
  const { playlistId } = req.params;
  try {
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json({
        error: "Playlist not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error while fetching playlist:", error);
    return res.status(500).json({
      error: "Error while fetching playlist",
    });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { problemIds } = req.body;

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({
        error: "Invalid or missing problems",
      });
    }

    // Create records for each problem in playlist
    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playlistId, problemId
      })),
    });

    res.status(201).json({
      success: true,
      message: "Problem added to playlist successfully",
      problemsInPlaylist,
    });
  } catch (error) {
    console.error("Error while adding problem to playlist:", error);
    return res.status(500).json({
      error: "Error while adding problem to playlist",
    });
  }
};

export const deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const deletedPlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
      deletedPlaylist,
    });
  } catch (error) {
    console.error("Error while deleting playlist:", error);
    return res.status(500).json({
      error: "Error while deleting playlist",
    });
  }
};

export const removeProblemFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({
        error: "Missing or Invalid problems",
      });
    }

    const deletedProblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problems removed successfully from playlist",
      deletedProblem,
    });
  } catch (error) {
    console.error("Error while removing problem from playlist:", error);
    return res.status(500).json({
      error: "Error while removing problem from playlist",
    });
  }
};
