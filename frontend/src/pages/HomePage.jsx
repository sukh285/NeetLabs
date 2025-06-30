import React from "react";
import { Link } from "react-router-dom";
import { Code, ChevronRight, Target, Zap, Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-base-100 w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full min-h-[80vh] flex items-center bg-gradient-to-br from-base-100 via-primary/5 to-base-100">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-6">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                    New & Improved
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 leading-tight tracking-tight">
                  Elevate Your Coding Skills with
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 block mt-1 font-bold">
                    LeetLab
                  </span>
                </h1>

                <p className="text-base text-base-content/75 max-w-xl leading-relaxed mb-8 font-light">
                  Solve curated challenges, master algorithms, and grow with a
                  community of passionate developers.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                {authUser ? (
                  <Link
                    to="/problems"
                    className="btn btn-primary btn-lg group shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 font-medium"
                  >
                    <span>Start Practicing</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="btn btn-primary btn-lg group shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 font-medium"
                    >
                      <span>Get Started</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/login"
                      className="btn btn-outline btn-lg border-base-300 shadow-sm hover:shadow-md hover:bg-base-200 transition-all font-medium"
                    >
                      Continue Learning
                    </Link>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md">
                {[
                  { value: "500+", label: "Problems" },
                  { value: "10k+", label: "Users" },
                  { value: "95%", label: "Satisfaction" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="text-center p-3 bg-base-100 border border-base-300 rounded-xl shadow-sm"
                  >
                    <div className="text-xl font-semibold text-primary tracking-wide">
                      {stat.value}
                    </div>
                    <div className="text-xs text-base-content/60 font-medium uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                <div className="relative bg-base-100 border border-base-300 rounded-3xl shadow-xl overflow-hidden">
                  {/* Code Editor Header */}
                  <div className="bg-base-300 px-4 py-3 flex items-center">
                    <div className="flex space-x-2 mr-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm font-mono">solution.js</div>
                  </div>

                  {/* Code Content */}
                  <div className="p-6 font-mono text-sm bg-gradient-to-br from-base-200 to-base-100">
                    <div className="text-primary">function</div>
                    <div className="ml-4">
                      <div className="text-secondary">twoSum</div>
                      <div className="text-base-content">
                        (nums, target) {"{"}
                      </div>
                      <div className="ml-4 text-base-content">
                        const map = new Map();
                      </div>
                      <div className="ml-4 text-base-content">
                        for (let i = 0; i {"<"} nums.length; i++) {"{"}
                      </div>
                      <div className="ml-8 text-base-content">
                        const complement = target - nums[i];
                      </div>
                      <div className="ml-8 text-base-content">
                        if (map.has(complement)) {"{"}
                      </div>
                      <div className="ml-12 text-base-content">
                        return [map.get(complement), i];
                      </div>
                      <div className="ml-8 text-base-content">{"}"}</div>
                      <div className="ml-8 text-base-content">
                        map.set(nums[i], i);
                      </div>
                      <div className="ml-4 text-base-content">{"}"}</div>
                      <div className="ml-4 text-base-content">return [];</div>
                      <div className="text-base-content">{"}"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section id="problems" className="w-full py-20 bg-base-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Challenging Problems
            </h2>
            <p className="text-xl text-base-content/80 max-w-3xl mx-auto mb-12">
              Practice with our collection of carefully curated coding
              challenges
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  level: "Beginner",
                  count: "150+",
                  color: "bg-success",
                },
                {
                  level: "Intermediate",
                  count: "250+",
                  color: "bg-warning",
                },
                {
                  level: "Advanced",
                  count: "120+",
                  color: "bg-error",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="card bg-base-100 shadow-lg border border-base-300"
                >
                  <div className="card-body p-8">
                    <div
                      className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center mb-4 mx-auto`}
                    >
                      <span className="text-white font-bold text-xl">
                        {item.count}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{item.level}</h3>
                    <p className="text-base-content/80">
                      Level-appropriate challenges
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="playlists" className="w-full py-20 bg-base-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Structured Playlists
            </h2>
            <p className="text-xl text-base-content/80 max-w-3xl mx-auto mb-12">
              Learn systematically with our topic-based playlists
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Algorithm Mastery",
                  topics: "Sorting, Searching, DP",
                },
                {
                  title: "Data Structure Deep Dive",
                  topics: "Trees, Graphs, Heaps",
                },
                {
                  title: "System Design Patterns",
                  topics: "OOD, Scalability, APIs",
                },
                {
                  title: "Competitive Programming",
                  topics: "Contest Strategies, Optimization",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="card bg-base-100 border border-base-300 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="card-body p-8 text-left">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mt-1">
                        <Code className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-base-content/80">
                          Topics: {item.topics}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="leaderboard"
        className="w-full py-20 bg-gradient-to-br from-base-200 to-base-100"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Leaderboard</h2>
            <p className="text-xl text-base-content/80 max-w-3xl mx-auto mb-12">
              Compete with developers worldwide and track your progress
            </p>
            <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
              <div className="p-6 bg-base-300">
                <div className="flex justify-between font-bold">
                  <span>Rank</span>
                  <span>User</span>
                  <span>Points</span>
                </div>
              </div>
              <div className="divide-y divide-base-300">
                {[1, 2, 3, 4, 5].map((rank) => (
                  <div
                    key={rank}
                    className="p-6 hover:bg-base-200 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">#{rank}</span>
                      <span className="font-medium">User{rank}</span>
                      <span className="font-bold text-primary">
                        {1500 - rank * 100}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-base-300">
                <Link
                  to="/leaderboard"
                  className="btn btn-primary btn-wide shadow-md"
                >
                  View Full Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-base-300 border-t border-base-300 py-12">
        <div className="w-full px-4 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-primary" />
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
