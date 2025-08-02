import React from "react";
import { Link } from "react-router-dom";
import { GitFork, Building, Bot, Code, ChevronRight } from "lucide-react";

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
      description:
        "Personalize your coding environment with themes and shortcuts",
    },
  ];

  return (
    <section className="relative w-full py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neet-base-100 via-white to-neet-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text Column */}
        <div
          className="lg:col-span-5 z-10 space-y-6"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <h2 className="text-4xl md:text-5xl font-limelight font-bold text-neet-neutral leading-snug">
            Supercharge <br />
            <span className="bg-neet-primary text-neet-neutral rounded-xl px-3 py-2 inline-block">
              Your Practice
            </span>
          </h2>
          <p className="text-sm text-neet-neutral/80 leading-relaxed max-w-md font-light">
            From real company problems to structured pattern-based prep,
            NeetLabs has everything you need to level up.
          </p>
          <Link
            to="/problems"
            className="btn-circle py-2 px-5 text-sm bg-neet-primary/80 text-neet-neutral border border-neet-primary/30 backdrop-blur-md shadow-lg hover:bg-white/10 hover:border-neet-primary transition w-fit flex items-center"
          >
            <span>Explore Problems</span>
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* Right Feature Grid */}
        <div className="lg:col-span-7 relative grid grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <div
            key={idx}
            className={`relative group p-5 sm:p-6 rounded-2xl border border-neet-base-300 bg-neet-neutral/90 text-neet-base-100 shadow-md transition-transform duration-300 backdrop-blur-md ${
              idx % 2 === 0 ? "translate-y-0" : "translate-y-8"
            }`}
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >          
              <div className="w-12 h-12 mb-4 bg-neet-primary/10 rounded-xl flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-neet-base-300 mt-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Second;
