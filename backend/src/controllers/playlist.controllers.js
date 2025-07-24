import { db } from "../libs/db.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description, accessLevel = "CUSTOM" } = req.body;
    const userId = req.user.id;

    const allowedAccessLevels = ["FREE", "PRO", "ADVANCED", "CUSTOM"];

    // If user is not admin, force accessLevel to CUSTOM
    if (req.user.role !== "ADMIN") {
      accessLevel = "CUSTOM";
    } else if (!allowedAccessLevels.includes(accessLevel)) {
      return res.status(400).json({ error: "Invalid access level" });
    }

    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
        accessLevel,
      },
    });

    res.status(200).json({
      success: true,
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error while creating playlist:", error);
    return res.status(500).json({ error: "Error while creating playlist" });
  }
};

export const getAllListDetails = async (req, res) => {
  try {
    const playlists = await db.playlist.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        problems: {
          include: {
            problem: {
              include: {
                solvedProblems: true,
                user: {
                  select: { id: true, name: true },
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
    return res.status(500).json({ error: "Error while fetching playlists" });
  }
};

export const getPlaylistDetails = async (req, res) => {
  const { playlistId } = req.params;
  try {
    const playlist = await db.playlist.findUnique({
      where: { id: playlistId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        problems: {
          include: {
            problem: {
              include: {
                solvedProblems: true,
                user: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const userPlan = req.user.plan;
    const allowedAccess =
      playlist.accessLevel === "FREE" ||
      (playlist.accessLevel === "CUSTOM" && playlist.userId === req.user.id) ||
      (playlist.accessLevel === "PRO" && userPlan !== "FREE") ||
      (playlist.accessLevel === "ADVANCED" && userPlan === "ADVANCED");

    if (!allowedAccess) {
      return res
        .status(403)
        .json({ error: "You don't have access to this playlist" });
    }

    const transformedPlaylist = {
      ...playlist,
      problems: playlist.problems.map((p) => p.problem),
      createdBy: {
        username: playlist.user.name || playlist.user.email,
      },
    };

    res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist: transformedPlaylist,
    });
  } catch (error) {
    console.error("Error while fetching playlist:", error);
    return res.status(500).json({ error: "Error while fetching playlist" });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { problemIds } = req.body;

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: "Invalid or missing problems" });
    }

    const playlist = await db.playlist.findUnique({
      where: { id: playlistId },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    // Authorization logic
    if (playlist.accessLevel !== "CUSTOM" && req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Only admins can modify premium playlists" });
    }

    if (playlist.accessLevel === "CUSTOM" && playlist.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to modify this playlist" });
    }

    const existingProblems = await db.problemInPlaylist.findMany({
      where: {
        playlistId,
        problemId: { in: problemIds },
      },
    });

    const existingProblemIds = existingProblems.map((p) => p.problemId);
    const newProblemIds = problemIds.filter(
      (id) => !existingProblemIds.includes(id)
    );

    if (newProblemIds.length === 0) {
      return res
        .status(400)
        .json({ error: "All problems are already in the playlist" });
    }

    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: newProblemIds.map((problemId) => ({ playlistId, problemId })),
    });

    res.status(201).json({
      success: true,
      message: "Problems added to playlist successfully",
      problemsInPlaylist,
    });
  } catch (error) {
    console.error("Error while adding problem to playlist:", error);
    return res
      .status(500)
      .json({ error: "Error while adding problem to playlist" });
  }
};

export const removeProblemFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: "Missing or Invalid problems" });
    }

    const playlist = await db.playlist.findUnique({
      where: { id: playlistId },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    // Authorization logic
    if (playlist.accessLevel !== "CUSTOM" && req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Only admins can modify premium playlists" });
    }

    if (playlist.accessLevel === "CUSTOM" && playlist.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to modify this playlist" });
    }

    const deletedProblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: { in: problemIds },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problems removed successfully from playlist",
      deletedProblem,
    });
  } catch (error) {
    console.error("Error while removing problem from playlist:", error);
    return res
      .status(500)
      .json({ error: "Error while removing problem from playlist" });
  }
};

export const deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const playlist = await db.playlist.findUnique({
      where: { id: playlistId },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    // Only admins can delete premium playlists
    if (playlist.accessLevel !== "CUSTOM" && req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Only admins can delete premium playlists" });
    }

    if (playlist.accessLevel === "CUSTOM" && playlist.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this playlist" });
    }

    const deletedPlaylist = await db.playlist.delete({
      where: { id: playlistId },
    });

    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
      deletedPlaylist,
    });
  } catch (error) {
    console.error("Error while deleting playlist:", error);
    return res.status(500).json({ error: "Error while deleting playlist" });
  }
};
