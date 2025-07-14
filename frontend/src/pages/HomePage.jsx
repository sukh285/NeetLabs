import React from "react";
import { Link } from "react-router-dom";
import { Code, ChevronRight, Target, Zap, Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const stats = [
  { value: "500+", label: "Problems", icon: <Target className="w-5 h-5 text-neet-primary" /> },
  { value: "10k+", label: "Users", icon: <Users className="w-5 h-5 text-neet-primary" /> },
  { value: "95%", label: "Satisfaction", icon: <Zap className="w-5 h-5 text-neet-primary" /> },
];

const HomePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-neet-base-100 w-full overflow-x-hidden font-inter">
      {/* Hero Section */}
      <section className="w-full min-h-[80vh] flex items-center bg-neet-base-100">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Text Content */}
            <div className="space-y-6">
              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl font-limelight font-bold leading-tight tracking-tight text-neet-neutral">
                Master Coding & Ace Interviews with
                <span className="block text-transparent font-limelight bg-clip-text bg-gradient-to-r from-neet-primary to-neet-secondary mt-1">
                  NeetLabs
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-md sm:text-lg text-neet-neutral/80 leading-relaxed max-w-xl font-light">
                Level up with hand-picked challenges, algorithmic problem-solving, curated playlists, and smart progress tracking — all in one platform designed to help you crack top tech interviews.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {authUser ? (
                  <Link
                    to="/problems"
                    className="btn btn-lg bg-neet-primary text-white hover:bg-neet-primary-focus transition-all shadow-md hover:shadow-lg"
                  >
                    Start Practicing
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="btn btn-lg bg-neet-primary text-white hover:bg-neet-primary-focus transition-all shadow-md hover:shadow-lg"
                    >
                      Get Started
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Link>
                    <Link
                      to="/login"
                      className="btn btn-lg border bg-neet-base-300 border-neet-base-300 text-neet-neutral hover:bg-neet-base-200 transition"
                    >
                      Continue Learning
                    </Link>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md pt-6">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-neet-neutral/80 text-center p-4 rounded-xl border border-neet-base-300 shadow-sm flex flex-col items-center"
                  >
                    <div className="mb-1">{stat.icon}</div>
                    <div className="text-xl font-semibold text-neet-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-neet-neutral-content uppercase tracking-wider font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Display */}
            <div className="relative">
              {/* Blobs */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-neet-primary/10 rounded-full blur-3xl opacity-70 animate-blob" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-neet-secondary/10 rounded-full blur-3xl opacity-70 animate-blob animation-delay-2000" />

              {/* Code Window */}
              <div className="relative border border-neet-base-300 rounded-2xl shadow-lg overflow-hidden bg-neet-primary">
                {/* Header */}
                <div className="bg-neet-neutral px-4 py-3 flex items-center">
                  <div className="flex space-x-2 mr-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="text-sm font-mono text-neet-base">
                    solution.js
                  </div>
                </div>

                {/* Code */}
                <div className="p-6 font-mono text-sm bg-gradient-to-br from-neet-base-200 to-neet-base-100 leading-relaxed text-neet-neutral/50">
                  <span className="text-neet-neutral">function</span>{" "}
                  <span className="text-neet-neutral/80">twoSum</span>(nums,
                  target) {"{"}
                  <br />
                  &nbsp;&nbsp;const map = new Map();
                  <br />
                  &nbsp;&nbsp;for (let i = 0; i {"<"} nums.length; i++) {"{"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;const complement = target - nums[i];
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;if (map.has(complement)) {"{"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return
                  [map.get(complement), i];
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{"}"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;map.set(nums[i], i);
                  <br />
                  &nbsp;&nbsp;{"}"}
                  <br />
                  &nbsp;&nbsp;return [];
                  <br />
                  {"}"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems" className="w-full py-20 bg-neet-base-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-limelight font-bold leading-tight tracking-tight text-neet-neutral">
                Challenging Problems
              </h2>
              <p className="text-md sm:text-lg text-neet-neutral/80 leading-relaxed max-w-xl font-light">
                Practice with our collection of carefully curated coding challenges, designed for all levels.
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md pt-2">
                {[
                  { value: "150+", label: "Beginner", color: "bg-success" },
                  { value: "250+", label: "Intermediate", color: "bg-warning" },
                  { value: "120+", label: "Advanced", color: "bg-error" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center bg-neet-neutral/80 p-4 rounded-xl border border-neet-base-300 shadow-sm`}
                  >
                    <div className={`w-8 h-8 rounded-full ${stat.color} flex items-center justify-center mb-2`}>
                      <span className="text-white font-bold text-base">{stat.value}</span>
                    </div>
                    <div className="text-xs text-neet-neutral-content uppercase tracking-wider font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  to="/problems"
                  className="btn btn-md bg-neet-primary text-white hover:bg-neet-primary-focus transition-all shadow-md hover:shadow-lg"
                >
                  Explore Problems
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
            {/* Right: Illustration */}
            <div className="relative flex justify-center">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-neet-primary/10 rounded-full blur-3xl opacity-70 animate-blob" />
              <div className="relative border border-neet-base-300 rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br from-neet-base-100 to-neet-base-200 w-full max-w-md mx-auto">
                <div className="p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Target className="w-8 h-8 text-neet-primary" />
                    <span className="text-xl font-bold text-neet-neutral">Problem Solving</span>
                  </div>
                  <ul className="list-disc list-inside text-neet-neutral/80 text-sm pl-2">
                    <li>Algorithmic & data structure challenges</li>
                    <li>Difficulty-based filtering</li>
                    <li>Real interview questions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Playlists Section */}
      <section id="playlists" className="w-full py-20 bg-neet-base-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Illustration */}
            <div className="relative flex justify-center order-2 lg:order-1">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-neet-secondary/10 rounded-full blur-3xl opacity-70 animate-blob animation-delay-2000" />
              <div className="relative border border-neet-base-300 rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br from-neet-base-200 to-neet-base-100 w-full max-w-md mx-auto">
                <div className="p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Code className="w-8 h-8 text-neet-primary" />
                    <span className="text-xl font-bold text-neet-neutral">Curated Playlists</span>
                  </div>
                  <ul className="list-disc list-inside text-neet-neutral/80 text-sm pl-2">
                    <li>Topic-based learning paths</li>
                    <li>Progress tracking</li>
                    <li>Hand-picked problems</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Right: Text */}
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-limelight font-bold leading-tight tracking-tight text-neet-neutral">
                Structured Playlists
              </h2>
              <p className="text-md sm:text-lg text-neet-neutral/80 leading-relaxed max-w-xl font-light">
                Learn systematically with our topic-based playlists, designed to help you master every concept.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-lg pt-2">
                {[
                  { title: "Algorithm Mastery", topics: "Sorting, Searching, DP" },
                  { title: "Data Structure Deep Dive", topics: "Trees, Graphs, Heaps" },
                  { title: "System Design Patterns", topics: "OOD, Scalability, APIs" },
                  { title: "Competitive Programming", topics: "Contest Strategies, Optimization" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-neet-neutral/80 border border-neet-base-300 rounded-xl p-4 flex flex-col gap-1 shadow-sm"
                  >
                    <div className="text-base font-bold text-neet-primary">{item.title}</div>
                    <div className="text-xs text-neet-neutral-content">Topics: {item.topics}</div>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  to="/playlists"
                  className="btn btn-md bg-neet-primary text-white hover:bg-neet-primary-focus transition-all shadow-md hover:shadow-lg"
                >
                  Browse Playlists
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section
        id="leaderboard"
        className="w-full py-20 bg-gradient-to-br from-neet-base-200 to-neet-base-100"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-limelight font-bold leading-tight tracking-tight text-neet-neutral">
                Leaderboard
              </h2>
              <p className="text-md sm:text-lg text-neet-neutral/80 leading-relaxed max-w-xl font-light">
                Compete with developers worldwide and track your progress as you climb the ranks.
              </p>
              <div className="pt-4">
                <Link
                  to="/leaderboard"
                  className="btn btn-md bg-neet-primary text-white hover:bg-neet-primary-focus transition-all shadow-md hover:shadow-lg"
                >
                  View Full Leaderboard
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
            {/* Right: Leaderboard Card */}
            <div className="relative flex justify-center">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-neet-primary/10 rounded-full blur-3xl opacity-70 animate-blob" />
              <div className="relative border border-neet-base-300 rounded-2xl shadow-lg overflow-hidden bg-neet-base-100 w-full max-w-md mx-auto">
                <div className="p-6 bg-neet-base-200 border-b border-neet-base-300">
                  <div className="flex justify-between font-bold text-neet-neutral">
                    <span>Rank</span>
                    <span>User</span>
                    <span>Points</span>
                  </div>
                </div>
                <div className="divide-y divide-neet-base-300">
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <div
                      key={rank}
                      className="p-6 hover:bg-neet-base-200 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-neet-neutral">#{rank}</span>
                        <span className="font-medium text-neet-neutral">User{rank}</span>
                        <span className="font-bold text-neet-primary">
                          {1500 - rank * 100}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-neet-neutral border-t border-neet-base-300 py-12">
        <div className="w-full px-4 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neet-primary/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-neet-primary" />
              </div>
              <span className="text-xl font-bold">LeetLab</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <a href="#problems" className="link link-hover">
                Problems
              </a>
              <a href="#playlists" className="link link-hover">
                Playlists
              </a>
              <a href="#leaderboard" className="link link-hover">
                Leaderboard
              </a>
              <Link to="/login" className="link link-hover">
                Login
              </Link>
              <Link to="/signup" className="link link-hover">
                Sign Up
              </Link>
            </div>

            <div className="text-center md:text-right">
              <p className="text-base-content/70">
                © 2023 LeetLab. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
