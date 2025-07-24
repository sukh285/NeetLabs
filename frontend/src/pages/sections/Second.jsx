import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Target } from "lucide-react";
import BotModelLoader from "../../templates/BotModelLoader";

const Second = () => {
  return (
    <section id="problems" className="w-full py-20 bg-neet-base-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-limelight font-bold leading-tight tracking-tight text-neet-neutral">
              Challenging Problems
            </h2>
            <p className="text-md sm:text-lg text-neet-neutral/80 leading-relaxed max-w-xl font-light">
              Practice with our collection of carefully curated coding
              challenges, designed for all levels.
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
                  <div
                    className={`w-8 h-8 rounded-full ${stat.color} flex items-center justify-center mb-2`}
                  >
                    <span className="text-white font-bold text-base">
                      {stat.value}
                    </span>
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
          <div className="w-full h-[70vh] bg-neet-100 relative">
            <BotModelLoader />
            <div className="absolute bottom-0 right-0 w-[40%] md:w-[45%] lg:w-[45%] h-[12%] xl:w-[30%] 2xl:w-[26%] bg-neet-base-200 z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Second;
