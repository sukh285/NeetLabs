import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Clock,
  ChevronRight,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  ArrowLeft,
  Timer,
  Square,
  Pause,
  RotateCcw,
  ChevronDown,
  Settings,
  Type,
  ToggleLeft,
  ToggleRight,
  Hash,
  Eye,
  EyeOff,
  Bot,
  CheckCircle,
  Share,
  Share2,
} from "lucide-react";

import { useProblemStore } from "../store/useProblemStore";
import { useExecutionStore } from "../store/useExecutionStore";
import { getLanguageId } from "../lib/lang";
import { useSubmissionStore } from "../store/useSubmissionStore";
import SubmissionResults from "../components/Submission";
import SubmissionsList from "../components/SubmissionList";
import AiTab from "../components/AiTab";
import toast from "react-hot-toast";

const ProblemPage = () => {
  const location = useLocation();

  const { id } = useParams();

  const { getProblemById, problem, isProblemLoading } = useProblemStore();

  const {
    submissionsByProblem,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const { executeCode, submission, isExecuting, resetSubmissionState } =
    useExecutionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [testcases, setTestcases] = useState([]);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Editor options state
  const [editorOptionsOpen, setEditorOptionsOpen] = useState(false);
  const [editorOptions, setEditorOptions] = useState({
    wordWrap: "off",
    fontSize: 16,
    lineNumbers: "on",
    minimap: false,
    autoIndent: "advanced",
    tabSize: 4,
    theme: "vs-dark",
  });

  // Timer functions
  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle language dropdown change
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    // Set code immediately when language changes
    if (problem?.codeSnippet?.[lang]) {
      setCode(problem.codeSnippet[lang]);
    }
    setDropdownOpen(false);
  };

  // Handle editor option changes
  const handleEditorOptionChange = (option, value) => {
    setEditorOptions((prev) => ({
      ...prev,
      [option]: value,
    }));
  };

  // Fetch problem and submission count on mount or id change
  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
    resetSubmissionState();
  }, [id, getProblemById, getSubmissionCountForProblem, resetSubmissionState]);

  // Update code and testcases when problem loads or changes
  useEffect(() => {
    if (!problem) return;

    // Set the default language code when problem loads
    if (problem.codeSnippet) {
      // If java exists, use it; otherwise use the first available language
      const availableLanguages = Object.keys(problem.codeSnippet);
      let defaultLang = selectedLanguage;

      if (!availableLanguages.includes(selectedLanguage)) {
        defaultLang = availableLanguages[0] || "java";
        setSelectedLanguage(defaultLang);
      }

      // Set the code for the selected/default language
      if (problem.codeSnippet[defaultLang]) {
        setCode(problem.codeSnippet[defaultLang]);
      }
    }

    // Set testcases
    if (problem.testcases) {
      setTestcases(
        problem.testcases.map((tc) => ({
          input: tc.input,
          output: tc.output,
        }))
      );
    }
  }, [problem, id]); // Remove selectedLanguage from dependency array

  // Separate effect for language changes (not initial load)
  useEffect(() => {
    if (!problem?.codeSnippet) return;

    // Only update code if we have the problem loaded and this is a language change
    if (
      problem.codeSnippet[selectedLanguage] &&
      code !== problem.codeSnippet[selectedLanguage]
    ) {
      setCode(problem.codeSnippet[selectedLanguage]);
    }
  }, [selectedLanguage, problem?.codeSnippet]);

  // Fetch submissions when switching to submissions tab
  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id, getSubmissionForProblem]);

  // Close editor options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editorOptionsOpen &&
        !event.target.closest(".editor-options-dropdown")
      ) {
        setEditorOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editorOptionsOpen]);

  // Render content for the selected tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-md mb-8 text-neet-base-100 font-inter leading-relaxed">
              {problem.description}
            </p>

            {problem.examples && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-6 text-neet-base-100">
                  Examples:
                </h3>
                {Object.entries(problem.examples).map(([lang, example]) => (
                  <div
                    key={lang}
                    className="bg-neet-neutral/30 border border-neet-accent/20 p-6 rounded-xl mb-6 font-mono shadow-lg"
                  >
                    <div className="mb-4">
                      <div className="text-neet-accent/80 mb-3 text-base font-semibold">
                        Input:
                      </div>
                      <div className="bg-neet-neutral/80 px-4 py-2 rounded-lg font-semibold text-neet-base-100 border border-neet-accent/20">
                        {example.input}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-neet-accent/80 mb-3 text-base font-semibold">
                        Output:
                      </div>
                      <div className="bg-neet-neutral/80 px-4 py-2 rounded-lg font-semibold text-neet-base-100 border border-neet-accent/20">
                        {example.output}
                      </div>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-green-400 mb-3 text-base font-semibold">
                          Explanation:
                        </div>
                        <p className="text-neet-base-100/70 text-base font-inter leading-relaxed">
                          {example.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {problem.constraints && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-neet-base-100">
                  Constraints:
                </h3>
                <ul className="bg-neet-neutral/40 border border-neet-accent/20 p-6 rounded-xl shadow-inner list-none space-y-3">
                  {problem.constraints
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((constraint, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-1 text-neet-primary text-lg font-bold select-none flex-shrink-0 leading-4">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            className="inline-block"
                          >
                            <circle cx="5" cy="5" r="5" fill="currentColor" />
                          </svg>
                        </span>
                        <span className="text-neet-base-100 text-base font-inter whitespace-pre-line break-words">
                          {constraint.trim()}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissionsByProblem?.[id] || []}
            isLoading={isSubmissionsLoading}
          />
        );
      case "discussion":
        return (
          <div className="p-8 text-center text-neet-base-100/70">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-neet-accent/40" />
            <p className="text-lg">No discussions yet</p>
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-neet-neutral/30 border border-neet-accent/20 p-6 rounded-xl">
                <div className="bg-neet-neutral/80 px-4 py-3 rounded-lg font-semibold text-neet-base-100 text-base leading-relaxed">
                  {problem.hints}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-neet-base-100/70">
                <Lightbulb className="w-16 h-16 mx-auto mb-4 text-neet-accent/40" />
                <p className="text-lg">No hints available</p>
              </div>
            )}
          </div>
        );
      case "ai":
        return <AiTab problemId={id} code={code} />;
      default:
        return null;
    }
  };

  // Show loading spinner while problem is loading
  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-neet-neutral font-inter">
        <span className="loading loading-spinner loading-lg text-neet-primary"></span>
      </div>
    );
  }

  //Just run code
  const handleRun = () => {
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id, {
        record: false, // don't save to DB
      });
    } catch (error) {
      console.error("Error running code", error);
    }
  };

  //Record submission
  const handleSubmit = async () => {
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);

      // Wait for executeCode to complete
      await executeCode(code, language_id, stdin, expected_outputs, id, {
        record: true, // save to DB
      });

      // After submission success, reload or switch tab
      if (activeTab === "submissions") {
        getSubmissionForProblem(id); // directly refetch
      } else {
        setActiveTab("submissions"); // switch to submissions tab and fetch via useEffect
      }
    } catch (error) {
      console.error("Error submitting code", error);
    }
  };

  const fromPlaylistId = location.state?.fromPlaylistId;
  const toPath = fromPlaylistId ? `/playlist/${fromPlaylistId}` : "/problems"; //"to" prop using conditionals

  return (
    <div className="w-full min-h-screen bg-neet-neutral font-inter">
      {/* Modern Navbar */}
      <div className="sticky top-0 z-50 bg-neet-neutral/95 backdrop-blur-lg border-b border-neet-accent/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Back Button & Title */}
            <div className="flex items-center gap-6">
              <Link
                to={toPath}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-neet-neutral/40 border border-neet-accent/20 hover:bg-neet-primary/10 hover:border-neet-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                state={fromPlaylistId ? { fromPlaylistId } : undefined}
              >
                <ArrowLeft className="w-5 h-5 text-neet-primary group-hover:text-neet-primary/80 transition-colors" />
              </Link>

              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-neet-primary to-neet-secondary rounded-full"></div>
                <div>
                  <h1 className="text-xl font-limelight font-bold text-neet-base-100">
                    {problem.title}
                  </h1>
                  <div className="flex items-center gap-4 text-xs text-neet-accent/60 mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(problem.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{submissionCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>95%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Right Section - Share & Upgrade */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied!");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neet-neutral/40 border border-neet-accent/20 hover:bg-neet-primary/10 hover:border-neet-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl text-neet-primary"
              >
                <Share2 className="w-3 h-3" />
              </button>

              <Link
                to="/pricing"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-primary-content font-semibold text-sm shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 w-full pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem description, submissions, etc. */}
          <div className="rounded-2xl mx-auto bg-neet-neutral/40 shadow-2xl border border-neet-accent/10">
            <div className="card-body p-0">
              <div className="flex gap-2 border-b border-neet-accent/10 px-6 mx-auto py-4">
                <button
                  className={`tab gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    activeTab === "description"
                      ? "bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-primary-content shadow-lg"
                      : "text-neet-accent/80 hover:bg-neet-neutral/30"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={`tab gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    activeTab === "submissions"
                      ? "bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-primary-content shadow-lg"
                      : "text-neet-accent/80 hover:bg-neet-neutral/30"
                  }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`tab gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    activeTab === "discussion"
                      ? "bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-primary-content shadow-lg"
                      : "text-neet-accent/80 hover:bg-neet-neutral/30"
                  }`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </button>
                <button
                  className={`tab gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    activeTab === "hints"
                      ? "bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-primary-content shadow-lg"
                      : "text-neet-accent/80 hover:bg-neet-neutral/30"
                  }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hints
                </button>
                <button
                  className={`tab gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    activeTab === "ai"
                      ? "bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-neutral shadow-lg"
                      : "text-neet-accent/80 hover:bg-neet-neutral/30 border border-neet-primary"
                  }`}
                  onClick={() => setActiveTab("ai")}
                >
                  <Bot className="w-4 h-4" />
                  Ask Neet
                </button>
              </div>
              <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {renderTabContent()}
              </div>
            </div>
          </div>

          {/* Code editor and run/submit buttons */}
          <div className="rounded-2xl bg-neet-neutral/40 shadow-2xl border border-neet-accent/10">
            <div className="card-body p-0 flex flex-col h-full">
              {/* Stopwatch Row with Language Dropdown on the right */}
              <div className="flex items-center justify-between border-b border-neet-accent/10 px-6 py-4">
                {/* Stopwatch moved here */}
                <div className="flex px-4 py-2 rounded-xl bg-neet-neutral/40 border border-neet-accent/20 items-center gap-3">
                  <Timer className="w-4 h-4 text-neet-primary" />
                  <span className="text-neet-base-100 font-mono text-sm font-medium min-w-[50px]">
                    {formatTime(time)}
                  </span>
                  <div className="flex items-center gap-1">
                    {!isRunning && !isPaused && (
                      <button
                        onClick={startTimer}
                        title="Start"
                        className="p-1 rounded-md hover:bg-neet-primary/20 transition-colors"
                      >
                        <Play className="w-3 h-3 text-green-400" />
                      </button>
                    )}
                    {isRunning && (
                      <button
                        onClick={pauseTimer}
                        title="Pause"
                        className="p-1 rounded-md hover:bg-neet-primary/20 transition-colors"
                      >
                        <Pause className="w-3 h-3 text-yellow-400" />
                      </button>
                    )}
                    {(isRunning || isPaused) && (
                      <button
                        onClick={stopTimer}
                        title="Stop"
                        className="p-1 rounded-md hover:bg-neet-primary/20 transition-colors"
                      >
                        <Square className="w-3 h-3 text-red-400" />
                      </button>
                    )}
                    {isPaused && (
                      <button
                        onClick={startTimer}
                        title="Resume"
                        className="p-1 rounded-md hover:bg-neet-primary/20 transition-colors"
                      >
                        <Play className="w-3 h-3 text-green-400" />
                      </button>
                    )}
                    <button
                      onClick={resetTimer}
                      title="Reset"
                      className="p-1 rounded-md hover:bg-neet-primary/20 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3 text-neet-accent/60" />
                    </button>
                  </div>
                </div>
                {/* Language Dropdown moved here */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neet-neutral/40 border border-neet-accent/20 transition-all duration-300 shadow-lg min-w-[140px]"
                  >
                    <Code2 className="w-4 h-4 text-neet-primary" />
                    <span className="text-neet-base-100 font-medium">
                      {selectedLanguage.charAt(0).toUpperCase() +
                        selectedLanguage.slice(1)}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neet-accent/60 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 py-2 bg-neet-neutral/90 backdrop-blur-lg border border-neet-accent/20 rounded-xl shadow-2xl z-50 min-w-[140px]">
                      {Object.keys(problem.codeSnippet || {}).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => handleLanguageChange(lang)}
                          className={`w-full px-4 py-2 text-left hover:bg-neet-primary/10 transition-colors ${
                            selectedLanguage === lang
                              ? "bg-neet-primary/20 text-neet-primary"
                              : "text-neet-base-100"
                          }`}
                        >
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Code Editor with proper height */}
              <div className="flex-1 px-6 py-4">
                <div className="h-[60vh] w-full">
                  <Editor
                    height="100%"
                    language={selectedLanguage.toLowerCase()}
                    theme={editorOptions.theme}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                      minimap: { enabled: editorOptions.minimap },
                      fontSize: editorOptions.fontSize,
                      lineNumbers: editorOptions.lineNumbers,
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      readOnly: false,
                      automaticLayout: true,
                      wordWrap: editorOptions.wordWrap,
                      fontFamily: "Inter, monospace",
                      padding: { top: 16, bottom: 16 },
                      autoIndent: editorOptions.autoIndent,
                      tabSize: editorOptions.tabSize,
                    }}
                    className="rounded-xl border border-neet-accent/20 shadow-inner bg-neet-neutral/80"
                  />
                </div>
              </div>

              {/* Editor Options Button */}
              <div className="px-6 py-2 border-t border-neet-accent/10">
                <div className="flex justify-end">
                  <div className="relative editor-options-dropdown">
                    <button
                      onClick={() => setEditorOptionsOpen(!editorOptionsOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neet-neutral/40 border border-neet-accent/20 hover:bg-neet-neutral/60 transition-all duration-200 text-sm"
                      title="Editor Options"
                    >
                      <Settings className="w-3 h-3 text-neet-accent/70" />
                      <span className="text-neet-accent/70 text-xs">
                        Options
                      </span>
                    </button>

                    {editorOptionsOpen && (
                      <div className="absolute bottom-full right-0 mb-2 w-64 py-3 bg-neet-neutral/95 backdrop-blur-lg border border-neet-accent/20 rounded-xl shadow-2xl z-50">
                        <div className="px-4 py-2 border-b border-neet-accent/10 mb-2">
                          <h3 className="text-sm font-semibold text-neet-base-100">
                            Editor Settings
                          </h3>
                        </div>

                        {/* Word Wrap */}
                        <div className="px-4 py-2 flex items-center justify-between hover:bg-neet-neutral/30 transition-colors">
                          <div className="flex items-center gap-2">
                            <Type className="w-3 h-3 text-neet-accent/70" />
                            <span className="text-sm text-neet-base-100">
                              Word Wrap
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleEditorOptionChange(
                                "wordWrap",
                                editorOptions.wordWrap === "off" ? "on" : "off"
                              )
                            }
                            className="flex items-center"
                          >
                            {editorOptions.wordWrap === "on" ? (
                              <ToggleRight className="w-4 h-4 text-neet-primary" />
                            ) : (
                              <ToggleLeft className="w-4 h-4 text-neet-accent/50" />
                            )}
                          </button>
                        </div>

                        {/* Line Numbers */}
                        <div className="px-4 py-2 flex items-center justify-between hover:bg-neet-neutral/30 transition-colors">
                          <div className="flex items-center gap-2">
                            <Hash className="w-3 h-3 text-neet-accent/70" />
                            <span className="text-sm text-neet-base-100">
                              Line Numbers
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleEditorOptionChange(
                                "lineNumbers",
                                editorOptions.lineNumbers === "on"
                                  ? "off"
                                  : "on"
                              )
                            }
                            className="flex items-center"
                          >
                            {editorOptions.lineNumbers === "on" ? (
                              <ToggleRight className="w-4 h-4 text-neet-primary" />
                            ) : (
                              <ToggleLeft className="w-4 h-4 text-neet-accent/50" />
                            )}
                          </button>
                        </div>

                        {/* Minimap */}
                        <div className="px-4 py-2 flex items-center justify-between hover:bg-neet-neutral/30 transition-colors">
                          <div className="flex items-center gap-2">
                            {editorOptions.minimap ? (
                              <Eye className="w-3 h-3 text-neet-accent/70" />
                            ) : (
                              <EyeOff className="w-3 h-3 text-neet-accent/70" />
                            )}
                            <span className="text-sm text-neet-base-100">
                              Minimap
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleEditorOptionChange(
                                "minimap",
                                !editorOptions.minimap
                              )
                            }
                            className="flex items-center"
                          >
                            {editorOptions.minimap ? (
                              <ToggleRight className="w-4 h-4 text-neet-primary" />
                            ) : (
                              <ToggleLeft className="w-4 h-4 text-neet-accent/50" />
                            )}
                          </button>
                        </div>

                        {/* Font Size */}
                        <div className="px-4 py-2 hover:bg-neet-neutral/30 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-neet-base-100">
                              Font Size
                            </span>
                            <span className="text-xs text-neet-accent/70">
                              {editorOptions.fontSize}px
                            </span>
                          </div>
                          <input
                            type="range"
                            min="12"
                            max="24"
                            step="1"
                            value={editorOptions.fontSize}
                            onChange={(e) =>
                              handleEditorOptionChange(
                                "fontSize",
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full h-1 bg-neet-accent/50 rounded-lg appearance-none cursor-pointer range-slider"
                          />
                        </div>

                        {/* Theme */}
                        <div className="px-4 py-2 hover:bg-neet-neutral/30 transition-colors border-t border-neet-accent/10 mt-2 pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-neet-base-100">
                              Theme
                            </span>
                          </div>
                          <select
                            value={editorOptions.theme}
                            onChange={(e) =>
                              handleEditorOptionChange("theme", e.target.value)
                            }
                            className="w-full px-3 py-1.5 bg-neet-accent border border-neet-accent/20 rounded-lg text-sm text-neet-neutral focus:outline-none focus:border-neet-primary/50"
                          >
                            <option value="vs-dark">Dark</option>
                            <option value="vs">Light</option>
                            <option value="hc-black">High Contrast</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-6 py-4 border-t border-neet-accent/10 bg-neet-neutral/30 rounded-b-2xl">
                <div className="flex justify-between items-center">
                  {/* Run Button */}
                  <button
                    className={`btn bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-primary-content font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl border-none gap-2 px-6 py-3 ${
                      isExecuting ? "loading" : ""
                    }`}
                    onClick={handleRun}
                    disabled={isExecuting}
                  >
                    {!isExecuting && <Play className="w-4 h-4" />}
                    {isExecuting ? "Running..." : "Run Code"}
                  </button>

                  {/* Submit Button */}
                  <button
                    className="btn bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl border-none gap-2 px-6 py-3"
                    onClick={handleSubmit}
                    disabled={isExecuting}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Submit Solution
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Cases / Submission Results */}
      <div className="rounded-2xl bg-neet-neutral/40 shadow-2xl mt-8 border border-neet-accent/10 max-w-7xl mx-auto mb-8">
        <div className="card-body p-6">
          {submission ? (
            <SubmissionResults submission={submission} />
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-neet-base-100">
                  Test Cases
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="table w-full rounded-xl overflow-hidden bg-neet-neutral/30 border border-neet-accent/10">
                  <thead className="bg-neet-neutral/50">
                    <tr>
                      <th className="text-neet-accent/80 font-semibold text-sm uppercase tracking-wider py-4 px-6">
                        Input
                      </th>
                      <th className="text-neet-accent/80 font-semibold text-sm uppercase tracking-wider py-4 px-6">
                        Expected Output
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {testcases.map((testCase, index) => (
                      <tr
                        key={index}
                        className="border-t border-neet-accent/10 hover:bg-neet-neutral/20 transition-colors"
                      >
                        <td className="font-mono text-neet-base-100 py-4 px-6 bg-neet-neutral/20 whitespace-pre-wrap">
                          {testCase.input}
                        </td>
                        <td className="font-mono text-neet-base-100 py-4 px-6 bg-neet-neutral/20 whitespace-pre-wrap">
                          {testCase.output}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
