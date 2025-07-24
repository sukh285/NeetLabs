import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Code } from "lucide-react";

const Third = () => {
  return (
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
                  <span className="text-xl font-bold text-neet-neutral">
                    Curated Playlists
                  </span>
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
              Learn systematically with our topic-based playlists, designed to
              help you master every concept.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-lg pt-2">
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
                  className="bg-neet-neutral/80 border border-neet-base-300 rounded-xl p-4 flex flex-col gap-1 shadow-sm"
                >
                  <div className="text-base font-bold text-neet-primary">
                    {item.title}
                  </div>
                  <div className="text-xs text-neet-neutral-content">
                    Topics: {item.topics}
                  </div>
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
  );
};

export default Third;
