import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import RotatingText from "../../templates/RotatingText";
import { Bot2 } from "../../templates/Bot2";

const Hero = () => {
  const { authUser } = useAuthStore();

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-[#FDFEFD]">
      {/* Bot Model */}
      <div className="absolute inset-0 z-11">
        <Bot2 />
        <div className="absolute bottom-0 right-0 w-full md:w-[20%] lg:w-[15%] xl:w-[15%] 2xl:w-[15%] h-[12%] z-50 px-3 py-2 md:mx-4 sm:mx-auto bg-neet-neutral shadow-lg border-neet-base-300 rounded-xl flex items-center justify-center">
          <span className="text-xs text-center sm:text-sm text-neet-base-100 font-medium">
            We love feedback!{" "}<br />
            <Link
              to="/feedback"
              className="underline text-neet-primary hover:text-neet-primary-focus transition-colors"
            >
              Tell us here
            </Link>
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center max-w-3xl mx-auto space-y-8">
          {/* Text Content */}
          <div
            className="space-y-6 flex flex-col items-center justify-center text-center"
          >
            {/* Heading */}
            <h1 data-aos="fade-up"
            data-aos-duration="1000" className="text-5xl md:text-6xl font-limelight font-bold leading-tight tracking-tight text-neet-neutral">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                Master{" "}
                <span className="font-limelight">
                  <RotatingText
                    texts={["Coding", "Interviews", "DSA", "Contests"]}
                    mainClassName="px-2 sm:px-2 md:px-3 bg-neet-primary leading-none text-neet-neutral overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </span>{" "}
                with
              </div>
              <span className="block text-transparent font-limelight bg-clip-text bg-gradient-to-r from-neet-primary to-neet-secondary mt-1">
                NeetLabs
              </span>
            </h1>
            {/* Subheading */}
            <p data-aos="fade-up"
            data-aos-duration="1000" className="text-sm text-neet-neutral/80 leading-relaxed max-w-xl font-light mx-auto">
              Level up with hand-picked challenges, algorithmic problem-solving,
              curated playlists, and smart progress tracking — all in one
              platform designed to help you crack top tech interviews.
            </p>
            {/* CTAs */}
            <div 
            data-aos="zoom-out"
            data-aos-duration="4000" className="flex flex-col relative z-50 sm:flex-row gap-4 pt-2 justify-center items-center text-sm">
              {authUser ? (
                <Link
                  to="/problems"
                  className="btn-circle py-2 px-4 border flex items-center bg-neet-primary/80 border-neet-primary/30 text-neet-neutral hover:bg-white/10 hover:border-neet-primary backdrop-blur-md shadow-lg transition"
                >
                  <span>Start Practicing</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="btn-circle py-2 px-6 border border-neet-primary bg-white/10 backdrop-blur-md text-neet-neutral hover:bg-neet-primary-focus transition-all shadow-lg flex items-center"
                  >
                    <span>Get Started</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    to="/login"
                    className="btn-circle py-2 px-4 border bg-neet-primary/80 border-neet-primary/30 text-neet-neutral hover:bg-white/10 hover:border-neet-primary backdrop-blur-md flex items-center shadow-lg transition"
                  >
                    Continue Learning
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
