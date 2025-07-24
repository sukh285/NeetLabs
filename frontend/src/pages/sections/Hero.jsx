import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import RotatingText from "../../templates/RotatingText";

const Hero = () => {
  const { authUser } = useAuthStore();

  return (
    <section className="w-full min-h-[90vh] flex items-center justify-center bg-neet-base-100">
      <div className="container mx-auto px-4 lg:px-8 py-16 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center max-w-3xl mx-auto space-y-8">
          {/* Text Content */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="space-y-6 flex flex-col items-center justify-center text-center"
          >
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-limelight font-bold leading-tight tracking-tight text-neet-neutral">
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
            <p className="text-sm text-neet-neutral/80 leading-relaxed max-w-xl font-light mx-auto">
              Level up with hand-picked challenges, algorithmic problem-solving,
              curated playlists, and smart progress tracking — all in one
              platform designed to help you crack top tech interviews.
            </p>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center items-center">
              {authUser ? (
                <Link
                  to="/problems"
                  className="btn-circle py-2 px-4 bg-neet-primary text-white hover:bg-neet-primary-focus transition-all shadow-md hover:shadow-lg flex items-center"
                >
                  <span>Start Practicing</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="btn-circle py-2 px-6 bg-neet-primary text-white hover:bg-neet-primary-focus transition-all shadow-md hover:shadow-lg flex items-center"
                  >
                    <span>Get Started</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    to="/login"
                    className="btn-circle py-2 px-4 border bg-neet-base-300 border-neet-neutral text-neet-neutral hover:bg-neet-base-200 transition"
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
