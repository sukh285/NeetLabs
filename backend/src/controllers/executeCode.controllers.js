import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";
import { db } from "../libs/db.js";

export const executeCode = async (req, res) => {
  try {
    const { source_code, language_id, stdin, expected_outputs, problem_id } =
      req.body;

    const userId = req.user.id;

    // 1. Validate test cases if they are in array format or not
    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({
        error: "Invalid or missing test case",
      });
    }

    // 2. Prepare testcases for judge0 batch submissions
    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));

    // 3. Send batch of submissions to judge0
    const submitResponse = await submitBatch(submissions);

    // console.log("Responses -->", submitResponse);

    const tokens = submitResponse.map((res) => res.token);

    // 4. Poll judge0 for results of all submitted testcases
    const results = await pollBatchResults(tokens);

    // console.log("Result -->", results);

    let allPassed = true;
    const testResults = results.map((result, i) => {
      const actual_output = result.stdout?.trim() || "";
      const expected_output = expected_outputs[i]?.trim() || "";

      const passed =
        result.status.id === 3 && actual_output === expected_output;
      if (!passed) allPassed = false;

      return {
        testCase: i + 1,
        passed,
        stdout: actual_output,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : undefined,
        time: result.time ? `${result.time} s` : undefined,
      };
    });

    console.log(testResults);

    // 5. Store testResults to summary
    const submission = await db.submission.create({
      data: {
        userId,
        problemId: problem_id,
        sourceCode: source_code,
        language: getLanguageName(language_id),
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(testResults.map((r) => r.stdout)),
        stderr: testResults.some((r) => r.stderr)
          ? JSON.stringify(testResults.map((r) => r.stderr))
          : null,
        compileOutput: testResults.some((r) => r.compile_output)
          ? JSON.stringify(testResults.map((r) => r.compile_output))
          : null,
        status: allPassed ? "Accepted" : "Wrong Answer",
        memory: testResults.some((r) => r.memory)
          ? JSON.stringify(testResults.map((r) => r.memory))
          : null,
        time: testResults.some((r) => r.time)
          ? JSON.stringify(testResults.map((r) => r.time))
          : null,
      },
    });

    // 6. If allPassed = true, mark problem as solved for user
    if (allPassed) {
      await db.problemSolved.upsert({
        //upsert --> create if no record else update if it exists
        where: {
          userId_problemId: {
            userId,
            problemId: problem_id,
          },
        },
        update: {},
        create: {
          userId,
          problemId: problem_id,
        },
      });
    }

    // 7. Save individual testcase results
    const testCaseResults = testResults.map((result) => ({
      submissionId: submission.id,
      testCase: result.testCase,
      passed: result.passed,
      stdout: result.stdout,
      expected: result.expected,
      stderr: result.stderr,
      compiledOutput: result.compile_output,
      status: result.status,
      memory: result.memory,
      time: result.time,
    }));

    await db.testCaseResult.createMany({
      data: testCaseResults,
    });

    //
    const submissionWithTestCase = await db.submission.findUnique({
      where: {
        id: submission.id,
      },
      include: {
        testCases: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Code Executed Successfully",
      submission: submissionWithTestCase,
    });
  } catch (error) {
    console.error("Error during code execution: ", error);
    return res.status(500).json({
      error: "Error during code execution",
    });
  }
};
