export const getAllSubmissions = async (req, res) => {
  try {
    const userId = req.user.id;

    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return res.status(500).json({
      error: "Error fetching all submissions",
    });
  }
};

export const getSubmissionsForProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const problemId = req.params.problemId;
    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
    });

    res.status(200).json({
      success: true,
      message: `Submissions fetched for problem successfully`,
      submissions,
    });
  } catch (error) {
    console.error("Error fetching submissions for problem:", error);
    return res.status(500).json({
      error: "Error fetching submission for problem",
    });
  }
};

export const getAllSubmissionCountForProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const submissions = await db.submission.count({
      where: {
        problemId: problemId,
      },
    });

    res.status(200).json({
      success: true,
      message: `Submissions counted for problem successfully`,
      count: submissions,
    });

  } catch (error) {
    console.error("Error counting submissions for problem:", error);
    return res.status(500).json({
      error: "Error counting submissions for problem",
    });
  }
};
