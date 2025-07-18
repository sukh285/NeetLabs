import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Save,
  TestTube,
  Settings,
  ArrowLeft,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios";
import { useProblemStore } from "../store/useProblemStore";

const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippet: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
  referenceSolution: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
});

const UpdateProblemForm = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      testcases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippet: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolution: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
    },
  });

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestcases,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

  // Fetch problem data on component mount
  useEffect(() => {
    if (problemId) {
      getProblemById(problemId);
    }
  }, [problemId, getProblemById]);

  // Populate form when problem data is loaded
  useEffect(() => {
    if (problem && !dataLoaded) {
      const formData = {
        title: problem.title || "",
        description: problem.description || "",
        difficulty: problem.difficulty || "EASY",
        constraints: problem.constraints || "",
        hints: problem.hints || "",
        editorial: problem.editorial || "",
        tags: problem.tags || [""],
        testcases: problem.testcases || [{ input: "", output: "" }],
        examples: problem.examples || {
          JAVASCRIPT: { input: "", output: "", explanation: "" },
          PYTHON: { input: "", output: "", explanation: "" },
          JAVA: { input: "", output: "", explanation: "" },
        },
        codeSnippet: problem.codeSnippet || {
          JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
          PYTHON: "def solution():\n    # Write your code here\n    pass",
          JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
        },
        referenceSolution: problem.referenceSolution || {
          JAVASCRIPT: "// Add your reference solution here",
          PYTHON: "# Add your reference solution here",
          JAVA: "// Add your reference solution here",
        },
      };

      // Reset form with loaded data
      reset(formData);
      
      // Replace field arrays with loaded data
      replaceTags(problem.tags || [""]);
      replaceTestcases(problem.testcases || [{ input: "", output: "" }]);
      
      setDataLoaded(true);
    }
  }, [problem, reset, replaceTags, replaceTestcases, dataLoaded]);

  const onSubmit = async (value) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.put(`/problem/update-problem/${problemId}`, value);
      toast.success(res.data.message || "Problem updated successfully");
      navigate("/problems");
    } catch (error) {
      toast.error("Error updating problem");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isProblemLoading || !problem) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-neet-accent/20 border-t-neet-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-neet-secondary rounded-full animate-spin animate-reverse"></div>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-neet-base-100 mb-2">
            Loading Problem
          </h3>
          <p className="text-neet-accent/60">Fetching problem details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-neet-neutral via-neet-neutral-focus to-neet-neutral">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="pt-8 pb-2 flex items-center">
          <button
            onClick={() => navigate("/problems")}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-neet-neutral/40 border border-neet-accent/20 hover:bg-neet-primary/10 hover:border-neet-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5 text-neet-primary group-hover:text-neet-primary/80 transition-colors" />
            <span className="text-neet-base-100 font-medium">Back to Problems</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative pt-8 pb-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-neet-primary/5 via-neet-secondary/5 to-neet-accent/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-neet-neutral/40 backdrop-blur-xl rounded-full border border-neet-accent/20 mb-6">
              <Settings className="w-5 h-5 text-neet-primary" />
              <span className="text-neet-accent/80 font-medium">
                Update Problem
              </span>
            </div>
            <p className="text-sm text-neet-accent/70 max-w-2xl mx-auto">
              Editing: <span className="font-semibold text-neet-base-100">{problem?.title}</span>
            </p>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-16">
          {/* Basic Information Card */}
          <div className="bg-neet-neutral/40 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-neet-primary to-neet-secondary rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-neet-neutral" />
              </div>
              <h3 className="text-xl font-semibold text-neet-base-100">
                Basic Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                  Problem Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200"
                  {...register("title")}
                  placeholder="Enter a descriptive problem title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-neet-error">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                  Problem Description
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-32 resize-y"
                  {...register("description")}
                  placeholder="Describe the problem clearly and concisely..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-neet-error">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                  Difficulty Level
                </label>
                <select
                  className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200"
                  {...register("difficulty")}
                >
                  <option value="EASY">🟢 Easy</option>
                  <option value="MEDIUM">🟡 Medium</option>
                  <option value="HARD">🔴 Hard</option>
                </select>
                {errors.difficulty && (
                  <p className="mt-1 text-sm text-neet-error">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="bg-neet-neutral/40 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-neet-secondary to-neet-accent rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-neet-neutral" />
                </div>
                <h3 className="text-xl font-semibold text-neet-base-100">
                  Tags
                </h3>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-neet-primary/20 hover:bg-neet-primary/30 text-neet-primary border border-neet-primary/20 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                onClick={() => appendTag("")}
              >
                <Plus className="w-4 h-4" />
                Add Tag
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tagFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="flex-1 px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200"
                    {...register(`tags.${index}`)}
                    placeholder="Tag name"
                  />
                  <button
                    type="button"
                    className="w-10 h-10 bg-neet-error/20 hover:bg-neet-error/30 text-neet-error rounded-lg transition-all duration-200 flex items-center justify-center"
                    onClick={() => removeTag(index)}
                    disabled={tagFields.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.tags && (
              <p className="mt-4 text-sm text-neet-error">
                {errors.tags.message}
              </p>
            )}
          </div>

          {/* Test Cases Section */}
          <div className="bg-neet-neutral/40 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-neet-info to-neet-success rounded-xl flex items-center justify-center">
                  <TestTube className="w-5 h-5 text-neet-neutral" />
                </div>
                <h3 className="text-xl font-semibold text-neet-base-100">
                  Test Cases
                </h3>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-neet-success/20 hover:bg-neet-success/30 text-neet-success border border-neet-success/20 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                onClick={() => appendTestCase({ input: "", output: "" })}
              >
                <Plus className="w-4 h-4" />
                Add Test Case
              </button>
            </div>

            <div className="space-y-6">
              {testCaseFields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-neet-neutral/20 rounded-xl p-6 border border-neet-accent/10"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-neet-base-100">
                      Test Case #{index + 1}
                    </h4>
                    <button
                      type="button"
                      className="px-3 py-1 bg-neet-error/20 hover:bg-neet-error/30 text-neet-error rounded-lg transition-all duration-200 flex items-center gap-2 text-sm"
                      onClick={() => removeTestCase(index)}
                      disabled={testCaseFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                        Input
                      </label>
                      <textarea
                        className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-20 resize-y"
                        {...register(`testcases.${index}.input`)}
                        placeholder="Test case input"
                      />
                      {errors.testcases?.[index]?.input && (
                        <p className="mt-1 text-sm text-neet-error">
                          {errors.testcases[index].input.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                        Expected Output
                      </label>
                      <textarea
                        className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-20 resize-y"
                        {...register(`testcases.${index}.output`)}
                        placeholder="Expected output"
                      />
                      {errors.testcases?.[index]?.output && (
                        <p className="mt-1 text-sm text-neet-error">
                          {errors.testcases[index].output.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.testcases && !Array.isArray(errors.testcases) && (
              <p className="mt-4 text-sm text-neet-error">
                {errors.testcases.message}
              </p>
            )}
          </div>

          {/* Code Editor Sections */}
          <div className="space-y-8">
            {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
              <div
                key={language}
                className="bg-neet-neutral/40 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-8 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-neet-primary to-neet-accent rounded-xl flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-neet-neutral" />
                  </div>
                  <h3 className="text-xl font-semibold text-neet-base-100">
                    {language}
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Starter Code */}
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-2 text-neet-accent/80">
                      Starter Code Template
                    </h4>
                    <div className="border border-neet-accent/10 rounded-xl overflow-hidden">
                      <Controller
                        name={`codeSnippet.${language}`}
                        control={control}
                        render={({ field }) => (
                          <Editor
                            height="300px"
                            language={language.toLowerCase()}
                            theme="vs-dark"
                            value={field.value}
                            onChange={field.onChange}
                            options={{
                              minimap: { enabled: false },
                              fontSize: 14,
                              lineNumbers: "on",
                              roundedSelection: false,
                              scrollBeyondLastLine: false,
                              automaticLayout: true,
                            }}
                          />
                        )}
                      />
                    </div>
                    {errors.codeSnippet?.[language] && (
                      <p className="mt-2 text-sm text-neet-error">
                        {errors.codeSnippet[language].message}
                      </p>
                    )}
                  </div>

                  {/* Reference Solution */}
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-2 text-neet-success flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Reference Solution
                    </h4>
                    <div className="border border-neet-success/10 rounded-xl overflow-hidden">
                      <Controller
                        name={`referenceSolution.${language}`}
                        control={control}
                        render={({ field }) => (
                          <Editor
                            height="300px"
                            language={language.toLowerCase()}
                            theme="vs-dark"
                            value={field.value}
                            onChange={field.onChange}
                            options={{
                              minimap: { enabled: false },
                              fontSize: 14,
                              lineNumbers: "on",
                              roundedSelection: false,
                              scrollBeyondLastLine: false,
                              automaticLayout: true,
                            }}
                          />
                        )}
                      />
                    </div>
                    {errors.referenceSolution?.[language] && (
                      <p className="mt-2 text-sm text-neet-error">
                        {errors.referenceSolution[language].message}
                      </p>
                    )}
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-2 text-neet-accent/80">
                      Example
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                          Input
                        </label>
                        <textarea
                          className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-16 resize-y"
                          {...register(`examples.${language}.input`)}
                          placeholder="Example input"
                        />
                        {errors.examples?.[language]?.input && (
                          <p className="mt-1 text-sm text-neet-error">
                            {errors.examples[language].input.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                          Output
                        </label>
                        <textarea
                          className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-16 resize-y"
                          {...register(`examples.${language}.output`)}
                          placeholder="Example output"
                        />
                        {errors.examples?.[language]?.output && (
                          <p className="mt-1 text-sm text-neet-error">
                            {errors.examples[language].output.message}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                          Explanation
                        </label>
                        <textarea
                          className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-20 resize-y"
                          {...register(`examples.${language}.explanation`)}
                          placeholder="Explain the example"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="bg-neet-neutral/40 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-neet-warning to-neet-accent rounded-xl flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-neet-neutral" />
              </div>
              <h3 className="text-xl font-semibold text-neet-base-100">
                Additional Information
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                  Constraints
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-20 resize-y"
                  {...register("constraints")}
                  placeholder="Enter problem constraints"
                />
                {errors.constraints && (
                  <p className="mt-1 text-sm text-neet-error">
                    {errors.constraints.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                  Hints (Optional)
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-20 resize-y"
                  {...register("hints")}
                  placeholder="Enter hints for solving the problem"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neet-accent/80 mb-2">
                  Editorial (Optional)
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl text-neet-base-100 placeholder-neet-accent/40 focus:border-neet-primary focus:outline-none focus:ring-2 focus:ring-neet-primary/20 transition-all duration-200 min-h-24 resize-y"
                  {...register("editorial")}
                  placeholder="Provide an editorial or solution explanation (optional)"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neet-primary hover:bg-neet-primary/90 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <Save className="w-5 h-5" />
              {isLoading ? "Saving..." : "Update Problem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProblemForm;