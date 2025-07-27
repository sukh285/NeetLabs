import React from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../../components/FeatureCard";
import { AlignJustify, BarChart3, Building2, ChevronRight, CircleHelp, Search, SlidersHorizontal, Square, Tags } from "lucide-react";

const Grid = () => {
  return (
    <div>
      <div className="bg-neet-base-100 items-center justify-center border p-4 grid grid-cols-4 gap-4 auto-rows-[200px]">
        {/* Problems Block */}
        <Link
          to="/problems"
          className="col-span-1 h-full row-span-2 bg-neet-base-100 border border-neet-neutral/30 hover:bg-neet-neutral hover:border-neet-primary rounded-xl p-8 flex flex-col justify-between hover:shadow-lg transition-all group"
        >
          {/* Heading Section */}
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-neet-neutral/80 group-hover:text-neet-primary transition">
              Practice Problems
            </h3>
            <p className="text-sm text-neet-primary transition leading-none">
              Problems designed to challenge, grow, and prepare you.
            </p>
          </div>

          {/* Stacked Cards Section with hover effect, icons, and label */}
          <div className="relative flex items-center justify-center w-full h-[70%] group">
            {/* Bottom card */}
            <div className="absolute -top-3 -left-3 z-2 w-full h-full rounded-2xl bg-gradient-to-br from-neet-neutral/40 to-neet-base-300 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"></div>
            {/* Middle card */}
            <div className="absolute top-0 left-0 z-4 w-full h-full rounded-2xl bg-gradient-to-br from-neet-neutral/60 to-neet-base-200 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"></div>
            {/* Top card */}
            <div className="absolute top-3 left-3 z-6 w-full h-full rounded-2xl bg-gradient-to-br from-neet-base-100 to-neet-neutral/80 shadow-lg flex flex-col items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
              <button
                className="flex items-center gap-2 px-6 py-3 bg-neet-neutral/80 text-neet-primary font-semibold rounded-xl shadow transition-colors duration-200 text-sm"
                tabIndex={-1}
                type="button"
                style={{ pointerEvents: "none" }} // Prevents button from being focusable/clickable since it's inside a Link
              >
                Explore Problems
                <ChevronRight className="w-5 h-5 text-center" />
              </button>
            </div>
            <style>
              {`
                .group:hover .-top-3.-left-3 {
                  top: -0.25rem;
                  left: -0.25rem;
                  transform: perspective(600px) rotateX(4deg) rotateY(-6deg) scale(1.05);
                }
                .group:hover .top-0.left-0 {
                  top: 0.25rem;
                  left: 0.25rem;
                  transform: perspective(600px) rotateX(7deg) rotateY(-9deg) scale(1.05);
                }
                .group:hover .top-3.left-3 {
                  top: 1.25rem;
                  left: 1.25rem;
                  transform: perspective(600px) rotateX(12deg) rotateY(-15deg) scale(1.10);
                }
                .-top-3, .-left-3, .top-0, .left-0, .top-3, .left-3 {
                  transition-property: transform, top, left;
                  transition-duration: 0.5s;
                  transition-timing-function: cubic-bezier(0.4,0,0.2,1);
                }
              `}
            </style>
          </div>
        </Link>

        {/* Patterns */}
        <Link
          to="/patterns"
          className="col-span-1 h-full bg-neet-base-100 border border-neet-neutral/30 hover:bg-neet-neutral hover:border-neet-primary rounded-xl p-6 flex items-center justify-center relative overflow-hidden hover:shadow-lg transition-all group"
        >
          {/* Central Label */}
          <span className="absolute text-6xl font-bold text-neet-primary/90 tracking-wide z-0 pointer-events-none select-none">
            Patterns
          </span>

          {/* Floating Badges */}
          <div className="relative z-10 w-full h-full">
            {/* Top Left */}
            <span className="absolute top-4 left-4 -rotate-7 bg-purple-300 text-neet-neutral/50 text-xs font-medium px-3 py-1 rounded-full shadow-sm animate-[floatY_4s_ease-in-out_infinite]">
              Arrays
            </span>
            {/* Top Right */}
            <span className="absolute top-1 right-1/3 rotate-4 bg-orange-300 text-neet-neutral/50 text-xs font-medium px-3 py-1 rounded-full shadow-sm animate-[floatY_4.5s_ease-in-out_infinite]">
              Sliding Window
            </span>
            {/* Bottom Left */}
            <span className="absolute -bottom-1 left-8 rotate-9 bg-pink-300 text-neet-neutral/50 text-xs font-medium px-3 py-1 rounded-full shadow-sm animate-[floatY_4.2s_ease-in-out_infinite]">
              Hashing
            </span>
            {/* Bottom Right */}
            <span className="absolute bottom-3 right-4 -rotate-2 bg-green-300 text-neet-neutral/50 text-xs font-medium px-3 py-1 rounded-full shadow-sm animate-[floatY_3.8s_ease-in-out_infinite]">
              Dynamic Programming
            </span>
            {/* Center Right */}
            <span className="absolute bottom-1/4 left-1 -rotate-12 bg-yellow-300 text-neet-neutral/50 text-xs font-medium px-3 py-1 rounded-full shadow-sm animate-[floatY_4.3s_ease-in-out_infinite]">
              Binary Search
            </span>
            {/* New Badge 1: Two Pointers */}
            <span className="absolute top-10 left-1/2 -translate-x-1/2 rotate-3 bg-blue-300 text-neet-neutral/50 text-xs font-medium px-3 py-1 rounded-full shadow-sm animate-[floatY_4.1s_ease-in-out_infinite]">
              Two Pointers
            </span>
            {/* New Badge 2: Greedy */}
            <span className="absolute top-3 right-1 -rotate-6 bg-gray-400 text-neet-neutral/50 text-xs font-medium px-3 py-1 rounded-full shadow-sm animate-[floatY_4.6s_ease-in-out_infinite]">
              Greedy
            </span>
            {/* New Badge 3: Graphs */}
            <span className="absolute top-1/2 right-6 -translate-y-1/2 rotate-8 bg-red-400 text-neet-neutral/50 text-xs font-medium px-3 py-1 rounded-full shadow-sm animate-[floatY_4.8s_ease-in-out_infinite]">
              Graphs
            </span>
          </div>

          {/* Minimal CSS */}
          <style>
            {`
      @keyframes floatY {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
    `}
          </style>
        </Link>

        {/* Problem Page */}
        <div className="col-span-2 row-span-3 h-full bg-neet-base-100 border border-neet-neutral/30 hover:bg-neet-neutral hover:border-neet-primary rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition-all group">
          {/* Top Content */}
          <div className="flex mb-4">
            {/* Left: Feature Tags */}
            <div className="flex flex-col gap-3 justify-center w-1/2">
              {/* Tag 1 */}
              <div className="flex items-center gap-3 bg-neet-neutral border border-neet-neutral/20 rounded-lg px-4 py-2 shadow-sm hover:bg-neet-neutral/70 hover:border-neet-primary transition-all group">
                <span className="bg-neet-primary/10 text-neet-primary group-hover:bg-neet-primary group-hover:text-white rounded-full p-2 transition">
                  <Square className="w-5 h-5" strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold text-neet-accent group-hover:text-neet-primary transition">
                  Customized Editor
                </span>
              </div>
              {/* Tag 2 */}
              <div className="flex items-center gap-3 bg-neet-neutral border border-neet-neutral/20 rounded-lg px-4 py-2 shadow-sm hover:bg-neet-neutral/70 hover:border-neet-primary transition-all group">
                <span className="bg-neet-secondary/10 text-neet-secondary group-hover:bg-neet-secondary group-hover:text-white rounded-full p-2 transition">
                  <AlignJustify className="w-5 h-5" strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold text-neet-accent group-hover:text-neet-secondary transition">
                  Multi-language Support
                </span>
              </div>
              {/* Tag 3 */}
              <div className="flex items-center gap-3 bg-neet-neutral border border-neet-neutral/20 rounded-lg px-4 py-2 shadow-sm hover:bg-neet-neutral/70 hover:border-neet-primary transition-all group">
                <span className="bg-neet-accent/10 text-neet-accent group-hover:bg-neet-accent group-hover:text-white rounded-full p-2 transition">
                  <CircleHelp className="w-5 h-5" strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold text-neet-accent group-hover:text-neet-secondary transition">
                  Access Hints via AI
                </span>
              </div>
            </div>

            {/* Right: Text */}
            <div className="flex flex-col justify-center items-start w-1/2 pl-8">
              <h2 className="text-3xl font-extrabold text-neet-primary mb-2">
                Problem Page Features
              </h2>
              <p className="text-neet-primary text-base">
                Everything you need to practice, learn, and master coding
                interview problems.
              </p>
            </div>
          </div>

          {/* Image Placeholder */}

          <div className="w-full h-full p-3 bg-gradient-to-br from-neet-primary via-neet-accent to-neet-secondary shadow-xl rounded-3xl transition-transform duration-300 ease-in-out group-hover:scale-102">
            <img
              src="/page1.png"
              alt="Problem Page Screenshot"
              className="h-full rounded-xl shadow-lg border border-neet-neutral/30"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="col-span-1 row-span-2 h-full bg-neet-base-100 border border-neet-neutral/30 hover:border-neet-primary hover:bg-neet-neutral rounded-xl p-6 flex flex-col relative overflow-hidden hover:shadow-xl transition-all duration-300 group">

          {/* Header */}
          <div className="flex items-center space-x-3 mt-4 pb-2 relative z-10">
            <h3 className="text-xl font-bold text-neet-neutral group-hover:text-neet-primary transition-colors duration-300">
              Smart Filters
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-neet-primary mb-6 leading-relaxed relative z-10">
            Discover problems tailored to your journey using intelligent
            filtering options.
          </p>

          {/* Filter Categories */}
          <div className="space-y-4 flex-1 relative z-10">
            {/* Difficulty Filter */}
            <div className="flex items-center justify-between p-3 bg-neet-neutral border border-neet-neutral/20 rounded-lg hover:border-neet-primary transition-all">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-neet-primary" />
                <span className="text-xs font-medium text-neet-accent">
                  Difficulty
                </span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-neet-success rounded-full"></div>
                <div className="w-2 h-2 bg-neet-warning rounded-full"></div>
                <div className="w-2 h-2 bg-neet-error rounded-full"></div>
              </div>
            </div>

            {/* Tags Filter */}
            <div className="flex items-center justify-between p-3 bg-neet-neutral border border-neet-neutral/20 rounded-lg hover:border-neet-primary transition-all">
              <div className="flex items-center gap-2">
                <Tags className="w-4 h-4 text-neet-primary" />
                <span className="text-xs font-medium text-neet-accent">
                  Tags
                </span>
              </div>
              <div className="flex space-x-1">
                <span className="text-xs bg-neet-primary/20 text-neet-primary px-2 py-0.5 rounded-full">
                  Array
                </span>
                <span className="text-xs bg-neet-secondary/20 text-neet-secondary px-2 py-0.5 rounded-full">
                  +15
                </span>
              </div>
            </div>

            {/* Company Filter */}
            <div className="flex items-center justify-between p-3 bg-neet-neutral border border-neet-neutral/20 rounded-lg hover:bg-neet-secondary/10 hover:border-neet-secondary transition-all">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-neet-primary" />
                <span className="text-xs font-medium text-neet-accent">
                  Companies
                </span>
              </div>
            </div>

            {/* Search Filter */}
            <div className="flex items-center justify-between p-3 bg-neet-neutral border border-neet-neutral/20 rounded-lg hover:bg-neet-accent/10 hover:border-neet-accent transition-all">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-neet-primary" />
                <span className="text-xs font-medium text-neet-accent">
                  Search by Name
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ai */}
        <div className="col-span-1 flex items-center justify-center border h-full border-neet-accent">
          Ai
        </div>

        {/* Full-width Dashboard */}
        <div className="col-span-4 flex items-center justify-center border h-full border-neet-accent">
          Dashboard
        </div>

        {/* Charts */}
        <div className="col-span-2 flex items-center justify-center border h-full border-neet-accent">
          Charts
        </div>
        <div className="col-span-2 flex items-center justify-center border h-full border-neet-accent">
          Progress
        </div>

        {/* Playlist Grid */}
        <div className="col-span-2 row-span-3 flex items-center justify-center border h-full border-neet-accent">
          Playlist Page
        </div>
        <div className="col-span-2 flex items-center justify-center border h-full border-neet-accent">
          Premium
        </div>
        <div className="col-span-2 flex items-center justify-center border h-full border-neet-accent">
          Custom Playlists
        </div>
        <div className="col-span-2 flex items-center justify-center border h-full border-neet-accent">
          At your pace
        </div>
      </div>
    </div>
  );
};

export default Grid;
