import React from "react";
import { Link } from "react-router-dom";
import { Code, Send } from "lucide-react";

const FeedbackPage = () => {
  return (
    <div className="min-h-screen w-full font-inter bg-gradient-to-br from-neet-neutral via-neet-neutral-focus to-neet-neutral py-8 px-2 flex items-center justify-center relative">
      {/* Card Container */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="w-full max-w-sm bg-white/70 border border-neet-base-300/50 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-6 sm:px-6 sm:py-8 space-y-6 transition-all duration-300 z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-2xl bg-neet-base-100/30 backdrop-blur-sm flex items-center justify-center shadow-lg border border-neet-base-100/20">
            <Code className="w-5 h-5 text-neet-primary" />
          </div>
          <h2 className="text-xl sm:text-2xl font-limelight font-bold text-neet-neutral text-center">
            We <span className="text-neet-primary">Absolutely</span> Want Your Feedback!
          </h2>
          <p className="text-neet-neutral/80 text-xs text-center max-w-xs">
            Your thoughts help us make NeetLabs better for everyone.<br />
            Please take a moment to share your feedback with us.
          </p>
        </div>

        {/* Feedback Link */}
        <Link
          to="https://forms.gle/A2DYhC9BH1kzZtuDA"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 bg-gradient-to-r from-neet-primary to-neet-secondary hover:from-neet-secondary hover:to-neet-accent text-white font-semibold rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 text-sm"
        >
          <Send className="w-4 h-4" />
          Write Feedback
        </Link>
      </div>
    </div>
  );
};

export default FeedbackPage;
