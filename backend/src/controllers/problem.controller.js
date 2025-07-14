import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
  //1- going to get all the data from request body
  //2- check user role again if admin
  //3- loop through each reference solution for each language
  //3.1- Get Judge0 language id for current language
  //3.2- Prepare Judge0 submissions for all testcases
  //3.3- Submit all test cases in one batch (returns [{token}, {token}])
  //3.4- Extracts tokems from response
  //3.5- Poll Judge0 until submissions are done
  //3.6- Validate that each test case is passed (status.id === 3)
  //4- Save problems in db after all validation passed

  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippet,
    referenceSolution,
  } = req.body;

  if (req.user.role !== "ADMIN") {
    res.status(403).json({
      error: "You are not allowed to create a problem",
    });
  }

  try {
    //for-each loop to get lang, sol out of referenceSolution Object
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported`,
        });
      }

      // preparing array of submissions for each language
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      //prepare batches
      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      //perform polling
      const results = await pollBatchResults(tokens);

      //check for status id 3
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result --> ", result);
        // console.log(
        //   `Testcase ${i+1} and Language ${language} --> result ${JSON.stringify(result.status.description)}`
        // );

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }

      //save problem to the db
      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippet,
          referenceSolution,
          userId: req.user.id,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Problem Created Succesfully",
        problem: newProblem,
      });
    }
  } catch (error) {
    console.error("Error creating problem:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      include: {
        solvedProblems: {
          where: {
            userId: req.user.id,
          },
        },
      },
    });

    if (problems.length === 0) {
      return res.status(404).json({
        error: "No problems found",
      });
    }

    console.log("All problems fetched");

    res.status(200).json({
      success: true,
      message: "Message fetched successfully",
      problems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error while fetching problems",
    });
  }
};

export const getProblemById = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json({
        error: "Problem not found",
      });
    }

    console.log("Problem was fetched -->", problem);

    res.status(200).json({
      success: true,
      message: "Problem found successfully",
      problem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error while fetching problem by id",
    });
  }
};

export const updateProblemById = async (req, res) => {
  //check id and find problem by id
  //once problem is found, perform same steps as createProblem with new data
  //in the end perform db.update instead of db.save
};

export const deleteProblemById = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Check if the problem exists
    const problem = await db.problem.findUnique({
      where: { id },
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    // Step 2: Delete TestCaseResults linked via Submissions
    const submissions = await db.submission.findMany({
      where: { problemId: id },
      select: { id: true },
    });

    const submissionIds = submissions.map((s) => s.id);

    if (submissionIds.length > 0) {
      await db.testCaseResult.deleteMany({
        where: {
          submissionId: { in: submissionIds },
        },
      });
    }

    // Step 3: Delete Submissions for this problem
    await db.submission.deleteMany({
      where: {
        problemId: id,
      },
    });

    // Step 4: Delete ProblemSolved entries
    await db.problemSolved.deleteMany({
      where: {
        problemId: id,
      },
    });

    // Step 5: Delete ProblemInPlaylist entries
    await db.problemInPlaylist.deleteMany({
      where: {
        problemId: id,
      },
    });

    // Step 6: Delete the Problem
    await db.problem.delete({
      where: { id },
    });

    console.log("Problem deleted -->", problem);

    res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting problem:", error);
    return res.status(500).json({
      error: "Error while deleting problem",
    });
  }
};

export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const problems = db.problem.findMany({
      where: {
        solvedProblems: {
          some: {
            userId: req.user.id,
          },
        },
      },
      include: {
        solvedProblems: {
          where: {
            userId: req.user.id,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      problems,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error while fetching solved problems by user",
    });
  }
};
