import { z } from "zod";

// Helper function to transform empty strings to undefined for optional fields
const emptyStringToUndefined = z.literal("").transform(() => undefined).optional();

export const problemSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  
  // Test cases - allow empty strings (valid for Judge0)
  testcases: z.array(
    z.object({
      input: z.string().default(""),
      output: z.string().default("")
    })
  ).min(1, "At least one test case is required"),
  
  // Tags - filter out empty ones in preprocessing
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  companyTags: z.array(z.string()).optional().default([]),
  
  // Examples for each language
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().optional().default(""),
      output: z.string().optional().default(""),
      explanation: z.string().optional().default("")
    }),
    PYTHON: z.object({
      input: z.string().optional().default(""),
      output: z.string().optional().default(""),
      explanation: z.string().optional().default("")
    }),
    JAVA: z.object({
      input: z.string().optional().default(""),
      output: z.string().optional().default(""),
      explanation: z.string().optional().default("")
    })
  }),
  
  // Code snippets
  codeSnippet: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java code snippet is required")
  }),
  
  // Reference solutions
  referenceSolution: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript reference solution is required"),
    PYTHON: z.string().min(1, "Python reference solution is required"),
    JAVA: z.string().min(1, "Java reference solution is required")
  }),
  
  // Optional fields
  constraints: z.string().trim().optional().or(emptyStringToUndefined),
  hints: z.string().trim().optional().or(emptyStringToUndefined),
  editorial: z.string().trim().optional().or(emptyStringToUndefined)
});