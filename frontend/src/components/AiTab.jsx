import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";

import { axiosInstance } from "../lib/axios";
import { useAiUsageStatus } from "../hooks/useAiUsageStatus";
import { useAuthStore } from "../store/useAuthStore";
import UsageDisplay from "../components/UsageDisplay";

const AiTab = ({ problemId, code }) => {
  const authUser = useAuthStore((state) => state.authUser);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const { usageStatus, loadingUsage, refreshUsageStatus } = useAiUsageStatus();

  // To track if we've already shown the no-requests-left message
  const [noRequestsMessageShown, setNoRequestsMessageShown] = useState(false);

  // Boilerplate Questions
  const starterQuestions = [
    "Where is my approach wrong?",
    "Is there a better solution?",
  ];

  // Load messages from localStorage on mount
  const storageKey = authUser
    ? `ai-chat-${authUser.id}-${problemId}`
    : `ai-chat-guest-${problemId}`; // fallback if no user

  useEffect(() => {
    if (!authUser) {
      setMessages([]); // clear if no user
      return;
    }

    const savedMessages = localStorage.getItem(storageKey);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([]);
    }
  }, [storageKey, authUser]);

  useEffect(() => {
    if (!authUser) return;

    if (messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [messages, storageKey, authUser]);

  // Scroll to bottom on messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  // Show no requests message automatically if usage hits 0 and message not yet shown
  useEffect(() => {
    if (
      usageStatus &&
      Number(usageStatus.remaining) <= 0 &&
      !noRequestsMessageShown
    ) {
      const noRequestsMessage = {
        id: Date.now(),
        type: "ai",
        content:
          "You have no AI requests left for today. Please subscribe to Pro for unlimited access or try again tomorrow.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, noRequestsMessage]);
      setNoRequestsMessageShown(true);
      setQuestion(""); // clear input if any
    }

    // Reset the flag if usage goes back up (e.g. new day or subscription)
    if (
      usageStatus &&
      Number(usageStatus.remaining) > 0 &&
      noRequestsMessageShown
    ) {
      setNoRequestsMessageShown(false);
    }
  }, [usageStatus, noRequestsMessageShown]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    if (usageStatus && Number(usageStatus.remaining) <= 0) {
      // Do nothing here because the message is already shown by the effect above.
      setQuestion("");
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: question,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/ai/ask", {
        problemId,
        userCode: code,
        question,
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: res.data.reply || "No response from AI.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: "Failed to get AI response. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        refreshUsageStatus();
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(`ai-chat-${problemId}`);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const noRequestsLeft = usageStatus && Number(usageStatus.remaining) <= 0;

  return (
    <div className="flex font-inter flex-col h-full max-h-[600px]">
      {/* Chat Header */}
      <div className="flex items-center justify-between pb-4 px-4 border-b border-neet-accent/10 bg-neet-neutral/30 rounded-t-xl">
        {/* Left: Icon + Title + Disclaimer */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-neet-primary" />
            <h3 className="text-sm font-semibold leading-none text-neet-base-100">
              NeetBot
            </h3>
          </div>
          <p className="text-xs text-neet-accent/50">
            I provide hints only — no full solutions.
            <span className="ml-2 text-[11px] text-neet-accent/40">
              (my brother GPT does that)
            </span>
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neet-neutral/20 min-h-[300px]">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="w-12 h-12 text-neet-accent/40 mb-3" />
            <p className="text-neet-accent/60 text-sm">
              Ask me anything about your code or the problem!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-neet-primary to-neet-secondary"
                    : "bg-neet-neutral border border-neet-accent/20"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-4 h-4 text-neet-primary-content" />
                ) : (
                  <Bot className="w-4 h-4 text-neet-primary" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[75%] ${
                  message.type === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-2xl ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-primary-content rounded-br-md"
                      : "bg-neet-neutral border border-neet-accent/20 text-neet-base-100 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
                <p className="text-xs text-neet-accent/50 mt-1 px-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}

        {/* Loading Message */}
        {loading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neet-neutral border border-neet-accent/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-neet-primary" />
            </div>
            <div className="bg-neet-neutral border border-neet-accent/20 text-neet-base-100 rounded-2xl rounded-bl-md px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-neet-primary rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-neet-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-neet-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm text-neet-accent/60">
                  AI is thinking...
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* BoilerPlate Questions */}
      {messages.length === 0 && (
        <div className="px-4 pb-4 bg-gradient-to-b from-neet-neutral/20 to-neet-neutral/10">
          <div className="bg-neet-neutral/40 border border-neet-accent/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-neet-primary to-neet-secondary rounded-full"></div>
              <h4 className="text-sm font-medium text-neet-base-100/90">
                Quick Start
              </h4>
              <div className="flex-1 h-px bg-gradient-to-r from-neet-accent/20 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {starterQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setQuestion(q)}
                  className="group relative px-4 py-3 bg-gradient-to-r from-neet-neutral/60 to-neet-neutral/40 hover:from-neet-primary/10 hover:to-neet-secondary/10 border border-neet-accent/15 hover:border-neet-primary/30 rounded-lg text-xs text-neet-accent/80 hover:text-neet-base-100 transition-all duration-200 text-left overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neet-primary/5 to-neet-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="relative flex items-center justify-between">
                    <span className="font-medium">{q}</span>
                    <Send className="w-3 h-3 opacity-0 group-hover:opacity-60 transform translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-neet-accent/10 bg-neet-neutral/30 rounded-b-xl">
        <UsageDisplay usageStatus={usageStatus} loadingUsage={loadingUsage} />
        <div className="flex gap-2 items-center">
          <div className="flex-1 relative flex items-center">
            <textarea
              ref={textareaRef}
              className="w-full p-3 pr-12 rounded-xl border bg-neet-neutral/60 border-neet-accent/20 text-neet-base-100 placeholder-neet-accent/50 resize-none focus:outline-none focus:ring-2 focus:ring-neet-primary/50 focus:border-neet-primary/30 transition-all align-middle"
              rows="1"
              style={{
                minHeight: "44px",
                maxHeight: "120px",
                resize: "none",
              }}
              placeholder="Ask about your code, get hints, or request explanations..."
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                // Auto-resize textarea
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={handleKeyPress}
              disabled={loading || noRequestsLeft}
            />
          </div>
          <button
            onClick={handleAsk}
            disabled={loading || !question.trim() || noRequestsLeft}
            className="flex-shrink-0 w-11 h-11 bg-gradient-to-r from-neet-primary to-neet-secondary text-neet-primary-content rounded-xl flex items-center justify-center font-semibold shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{ alignSelf: "stretch", marginBottom: 0 }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        {noRequestsLeft && (
          <p className="mt-2 text-xs text-red-500">
            You have no AI requests left for today. Please subscribe to Pro or
            try again tomorrow.
          </p>
        )}
        <div className="flex items-center justify-between mt-2 text-xs text-neet-accent/50">
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
      </div>
    </div>
  );
};

export default AiTab;
