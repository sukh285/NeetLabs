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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        problems: {
          include: {
            problem: {
              include: {
                solvedProblems: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        problems: {
          include: {
            problem: {
              include: {
                solvedProblems: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json({
        error: "Playlist not found",
      });
    }

    // Transform the data to match frontend expectations
    const transformedPlaylist = {
      ...playlist,
      problems: playlist.problems.map(p => p.problem), // Extract actual problem data
      createdBy: {
        username: playlist.user.name || playlist.user.email
      }
    };

    res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist: transformedPlaylist,
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

    // Verify playlist exists and belongs to user
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
    });

    if (!playlist) {
      return res.status(404).json({
        error: "Playlist not found",
      });
    }

    // Check if problems already exist in playlist to avoid duplicates
    const existingProblems = await db.problemInPlaylist.findMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    const existingProblemIds = existingProblems.map(p => p.problemId);
    const newProblemIds = problemIds.filter(id => !existingProblemIds.includes(id));

    if (newProblemIds.length === 0) {
      return res.status(400).json({
        error: "All problems are already in the playlist",
      });
    }

    // Create records for each new problem in playlist
    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: newProblemIds.map((problemId) => ({
        playlistId, 
        problemId
      })),
    });

    res.status(201).json({
      success: true,
      message: "Problems added to playlist successfully",
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
    // Verify playlist exists and belongs to user
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
    });

    if (!playlist) {
      return res.status(404).json({
        error: "Playlist not found",
      });
    }

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

    // Verify playlist exists and belongs to user
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
    });

    if (!playlist) {
      return res.status(404).json({
        error: "Playlist not found",
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