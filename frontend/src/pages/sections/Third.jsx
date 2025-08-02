import React from "react";
import { Link } from "react-router-dom";
import { ListPlus, Crown, Briefcase, TrendingUp, ChevronRight } from "lucide-react";

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
    <section className="relative w-full py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neet-base-100 to-neet-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Cards Column */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-6" data-aos="fade-up" data-aos-duration="1500">
          {playlistFeatures.map((feature, idx) => (
            <div
              key={idx}
              className={`bg-neet-neutral/90 border border-neet-base-300 backdrop-blur-sm p-5 rounded-2xl text-neet-base-100 shadow-md hover:shadow-lg transition-all duration-300 ${
                idx % 2 === 1 ? "translate-y-6" : ""
              }`}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="mb-4 w-12 h-12 bg-neet-primary/10 rounded-xl flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-neet-base-300 mt-1">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Text Column */}
        <div className="lg:col-span-5 flex flex-col justify-center items-end space-y-6 text-right" data-aos="fade-left" data-aos-duration="1000">
          <h2 className="text-4xl md:text-5xl font-limelight font-bold text-neet-neutral leading-snug">
            Learn Smarter <br />
            <span className="bg-neet-primary text-neet-neutral rounded-xl px-3 py-2 inline-block">
              With Playlists
            </span>
          </h2>
          <p className="text-sm text-neet-neutral/80 font-light leading-relaxed max-w-md">
            Whether it's recursion, dynamic programming, or system design, build your own tracks or follow expert ones.
          </p>
          <Link
            to="/playlists"
            className="btn-circle py-2 px-5 text-sm bg-neet-primary/80 text-neet-neutral border border-neet-primary/30 backdrop-blur-md shadow-lg hover:bg-white/10 hover:border-neet-primary transition w-fit flex items-center"
          >
            <span>Explore Playlists</span>
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Third;
