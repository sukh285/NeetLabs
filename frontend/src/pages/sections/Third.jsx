import React from "react";
import { Link } from "react-router-dom";
import {
  ListPlus,
  Crown,
  Briefcase,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const Third = () => {
  const playlistFeatures = [
    {
      icon: <ListPlus className="w-6 h-6 text-neet-primary" />,
      title: "Create Custom Playlists",
      description: "Organize problems your way to focus on key concepts.",
    },
    {
      icon: <Crown className="w-6 h-6 text-neet-primary" />,
      title: "Premium Playlists",
      description: "Access curated tracks by experts for accelerated growth.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-neet-primary" />,
      title: "Company-based Playlists",
      description: "Solve handpicked problems asked by top tech firms.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-neet-primary" />,
      title: "Track Your Progress",
      description: "Grow at your own pace and monitor your mastery.",
    },
  ];

  return (
    <section
      id="playlists"
      className="w-full py-24 my-[15vh] bg-gradient-to-b from-neet-base-100 via-white to-neet-base-100"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Feature Cards */}
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            className="grid grid-cols-2 gap-5"
          >
            {playlistFeatures.map((feature, idx) => (
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

          {/* Right: Text Content */}
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            className="flex flex-col justify-center h-full space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-limelight font-bold leading-tight text-neet-neutral">
              Learn Your Way <br />
              <span className="text-neet-neutral bg-neet-primary rounded-xl px-2 py-2">
                With Playlists
              </span>
            </h2>

            <p className="text-xs sm:text-xs md:text-sm text-neet-neutral/80 leading-relaxed max-w-xl font-light">
              Unlock structured learning with playlists tailored to your goals—
              be it mastering recursion, nailing system design, or cracking FAANG.
            </p>

            {/* CTA Button */}
            <Link
              to="/playlists"
              className="btn-circle py-2 px-4 border flex items-center bg-neet-primary/80 border-neet-primary/30 text-neet-neutral hover:bg-white/10 hover:border-neet-primary backdrop-blur-md shadow-lg transition w-fit text-sm"
            >
              <span className="font-medium">Explore Playlists</span>
              <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Third;
