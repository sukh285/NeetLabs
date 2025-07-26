import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { problemSchema } from "../lib/problemSchema";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  BookOpen,
  CheckCircle2,
  Download,
  Lightbulb,
  Save,
  Zap,
  Target,
  Trophy,
  Settings,
  TestTube,
  Puzzle,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "../lib/axios";
import { sampledpData, sampleStringProblem } from "../data/sampleData";
import SetCodeModal from "./SetCodeModal";

const CreateProblemForm = () => {
  const [sampleType, setSampleType] = useState("DP");
  const navigation = useNavigate();
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
      companyTags: [""],
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
    replace: replacetestcases,
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

  const {
    fields: companyFields,
    append: appendCompany,
    remove: removeCompany,
  } = useFieldArray({
    control,
    name: "companyTags",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSetCodeModalOpen, setIsSetCodeModalOpen] = useState(false);

  // Updated onSubmit function for form component
  const onSubmit = async (value) => {
    try {
      setIsLoading(true);

      // Clean and validate the data before sending
      const cleanedValue = {
        ...value,
        // Clean test cases - preserve empty strings but trim whitespace-only strings to empty
        testcases: value.testcases.map((tc) => ({
          input:
            typeof tc.input === "string"
              ? tc.input.trim() === ""
                ? ""
                : tc.input.trim()
              : "",
          output:
            typeof tc.output === "string"
              ? tc.output.trim() === ""
                ? ""
                : tc.output.trim()
              : "",
        })),

        // Clean tags - trim and filter out empty ones
        tags: value.tags
          .map((tag) => tag?.trim())
          .filter((tag) => tag && tag.length > 0),

        // Clean company tags - trim and filter out empty ones
        companyTags: value.companyTags
          .map((tag) => tag?.trim())
          .filter((tag) => tag && tag.length > 0),

        // Clean examples for each language
        examples: {
          JAVASCRIPT: {
            input: value.examples.JAVASCRIPT.input?.trim() || "",
            output: value.examples.JAVASCRIPT.output?.trim() || "",
            explanation: value.examples.JAVASCRIPT.explanation?.trim() || "",
          },
          PYTHON: {
            input: value.examples.PYTHON.input?.trim() || "",
            output: value.examples.PYTHON.output?.trim() || "",
            explanation: value.examples.PYTHON.explanation?.trim() || "",
          },
          JAVA: {
            input: value.examples.JAVA.input?.trim() || "",
            output: value.examples.JAVA.output?.trim() || "",
            explanation: value.examples.JAVA.explanation?.trim() || "",
          },
        },

        // Clean other text fields
        title: value.title?.trim(),
        description: value.description?.trim(),
        constraints: value.constraints?.trim() || undefined,
        hints: value.hints?.trim() || undefined,
        editorial: value.editorial?.trim() || undefined,
      };

      // Prepare the request body: stringify input if it's an object
      const prepared = {
        ...cleanedValue,
        testcases: cleanedValue.testcases.map(tc => ({
          ...tc,
          input: typeof tc.input === "object" ? JSON.stringify(tc.input) : tc.input,
          output: tc.output,
        })),
      };

      // Ensure we have at least one test case
      if (prepared.testcases.length === 0) {
        toast.error("At least one test case is required");
        return;
      }

      // Ensure we have at least one tag
      if (prepared.tags.length === 0) {
        toast.error("At least one tag is required");
        return;
      }

      const res = await axiosInstance.post(
        "/problem/create-problem",
        prepared
      );
      toast.success(res.data.message || "Problem created successfully");
      navigation("/problems");
    } catch (error) {
      console.error("Error creating problem:", error);
      toast.error(error.response?.data?.message || "Error creating problem");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem;
    replaceTags(sampleData.tags.map((tag) => tag));
    replacetestcases(sampleData.testcases.map((tc) => tc));
    reset(sampleData);
  };

  const handleLoadJson = (json) => {
    // Serialize testcases' input/output fields if they are objects
    const sanitized = {
      ...json,
      testcases: (json.testcases || []).map((tc) => ({
        input: typeof tc.input === "object" ? JSON.stringify(tc.input) : tc.input,
        output:
          typeof tc.output === "object" ? JSON.stringify(tc.output) : tc.output,
      })),
    };
  
    if (sanitized.tags) replaceTags(sanitized.tags.map((tag) => tag));
    if (sanitized.testcases) replacetestcases(sanitized.testcases);
    reset({ ...json, testcases: sanitized.testcases });
  };
  

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-neet-neutral via-neet-neutral-focus to-neet-neutral">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative pt-16 pb-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-neet-primary/5 via-neet-secondary/5 to-neet-accent/5 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-neet-neutral/40 backdrop-blur-xl rounded-full border border-neet-accent/20 mb-6">
              <Puzzle className="w-5 h-5 text-neet-primary" />
              <span className="text-neet-accent/80 font-medium">
                Create Problem
              </span>
            </div>
          </div>
        </div>

        {/* Sample Data Controls */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          {/* Sample Data Controls Group */}
          <div className="flex items-center gap-2 bg-neet-neutral/40 backdrop-blur-xl rounded-full p-1 border border-neet-accent/20">
            {/* Sample Type Toggle */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  sampleType === "DP"
                    ? "bg-neet-primary text-neet-neutral shadow"
                    : "text-neet-accent/70 hover:text-neet-accent"
                }`}
                onClick={() => setSampleType("DP")}
              >
                DP Problem
              </button>
              <button
                type="button"
                className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  sampleType === "string"
                    ? "bg-neet-primary text-neet-neutral shadow"
                    : "text-neet-accent/70 hover:text-neet-accent"
                }`}
                onClick={() => setSampleType("string")}
              >
                String Problem
              </button>
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-neet-accent/20"></div>

            {/* Load Sample Data Button */}
            <button
              type="button"
              className="px-3 py-1.5 bg-neet-secondary/20 hover:bg-neet-secondary/30 text-neet-accent rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5"
              onClick={loadSampleData}
            >
              <Download className="w-3.5 h-3.5" />
              Load Sample
            </button>
          </div>

          {/* OR Separator */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-neet-accent/30 to-transparent"></div>
            <span className="text-neet-accent/50 text-xs font-medium uppercase tracking-wider">
              or
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-neet-accent/30 to-transparent"></div>
          </div>

          {/* JSON Upload Button */}
          <button
            type="button"
            className="px-4 py-2 bg-neet-info/20 hover:bg-neet-info/30 text-neet-info border border-neet-info/20 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 backdrop-blur-xl shadow-sm hover:shadow-md"
            onClick={() => setIsSetCodeModalOpen(true)}
          >
            <Code2 className="w-4 h-4" />
            Load from JSON
          </button>
        </div>

        <SetCodeModal
          isOpen={isSetCodeModalOpen}
          onClose={() => setIsSetCodeModalOpen(false)}
          onLoad={handleLoadJson}
        />

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

          {/* Company Tags Section */}
          <div className="bg-neet-neutral/40 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-neet-secondary to-neet-accent rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-neet-neutral" />
                </div>
                <h3 className="text-xl font-semibold text-neet-base-100">
                  Company Tags
                </h3>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-neet-primary/20 hover:bg-neet-primary/30 text-neet-primary border border-neet-primary/20 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                onClick={() => appendCompany("")}
              >
                <Plus className="w-4 h-4" />
                Add Company Tag
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companyFields.map((field, idx) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Company name"
                    className="flex-1 px-4 py-3 bg-neet-neutral/30 border border-neet-accent/20 rounded-xl"
                    {...register(`companyTags.${idx}`)}
                  />
                  <button
                    type="button"
                    className="w-10 h-10 bg-neet-error/20 hover:bg-neet-error/30 text-neet-error rounded-lg flex items-center justify-center"
                    onClick={() => removeCompany(idx)}
                    disabled={companyFields.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.companyTags && (
              <p className="mt-4 text-sm text-neet-error">
                {errors.companyTags.message}
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
                      <Controller
                        name={`testcases.${index}.input`}
                        control={control}
                        render={({ field }) => (
                          <div className="border rounded text-black">
                            <Editor
                              height="150px"
                              defaultLanguage="json"
                              theme="vs-dark"
                              value={
                                typeof field.value === "string"
                                  ? field.value
                                  : JSON.stringify(field.value, null, 2)
                              }
                              onChange={(val) => {
                                try {
                                  field.onChange(JSON.parse(val || "{}"));
                                } catch {
                                  field.onChange(val); // fallback if not valid JSON yet
                                }
                              }}
                              options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                              }}
                            />
                          </div>
                        )}
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
                      <Controller
                        name={`testcases.${index}.output`}
                        control={control}
                        render={({ field }) => (
                          <div className="border rounded text-black">
                            <Editor
                              height="150px"
                              defaultLanguage="json"
                              theme="vs-dark"
                              value={
                                typeof field.value === "string"
                                  ? field.value
                                  : JSON.stringify(field.value, null, 2)
                              }
                              onChange={(val) => {
                                try {
                                  field.onChange(JSON.parse(val || "{}"));
                                } catch {
                                  field.onChange(val); // fallback if not valid JSON yet
                                }
                              }}
                              options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                              }}
                            />
                          </div>
                        )}
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
                  placeholder="Enter problem editorial/solution explanation"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-neet-primary hover:bg-neet-secondary text-neet-neutral font-bold rounded-full text-lg flex items-center gap-3 shadow-lg transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Create Problem
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProblemForm;
