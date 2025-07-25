import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  GitFork,
  Building,
  Bot,
  Code,
} from "lucide-react";

const Second = () => {
  const features = [
    {
      icon: <GitFork className="w-6 h-6 text-neet-primary" />,
      title: "Problem Patterns",
      description: "Master 50+ algorithmic patterns with curated challenges",
    },
    {
      icon: <Building className="w-6 h-6 text-neet-primary" />,
      title: "Company Tags",
      description: "Practice problems tagged by FAANG and top tech companies",
    },
    {
      icon: <Bot className="w-6 h-6 text-neet-primary" />,
      title: "NeetBot Help",
      description: "AI-powered guidance to unblock your coding challenges",
    },
    {
      icon: <Code className="w-6 h-6 text-neet-primary" />,
      title: "Customizable Editor",
      description: "Personalize your coding environment with themes and shortcuts",
    },
  ];

  return (
    <section id="features" className="w-full py-24 my-[15vh] bg-gradient-to-b from-neet-base-100 via-white to-neet-base-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Centered Text Content */}
          <div data-aos="fade-right"
            data-aos-duration="1000" className="flex flex-col justify-center h-full space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-limelight font-bold leading-tight text-neet-neutral">
              Elevate Your <br />
              <span className="text-neet-neutral bg-neet-primary rounded-xl px-2 py-2">
                Coding Journey
              </span>
            </h2>

            <p className="text-xs sm:text-xs md:text-sm text-neet-neutral/80 leading-relaxed max-w-xl font-light">
              Access problems that accelerate your problem-solving skills and interview preparation.
            </p>

            {/* Button placed just below subheading */}
            <Link
              to="/problems"
              className="btn-circle py-2 px-4 border flex items-center bg-neet-primary/80 border-neet-primary/30 text-neet-neutral hover:bg-white/10 hover:border-neet-primary backdrop-blur-md shadow-lg transition w-fit text-sm"
            >
              <span className="font-medium">Explore Problems</span>
              <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Features Grid instead */}
          <div data-aos="fade-up"
            data-aos-duration="1500" className="grid grid-cols-2 gap-5">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-neet-neutral/90 backdrop-blur-sm p-5 rounded-2xl border border-neet-base-300 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="mb-3">
                  <div className="w-12 h-12 rounded-xl bg-neet-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-neet-base-100 mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-neet-base-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Second;
