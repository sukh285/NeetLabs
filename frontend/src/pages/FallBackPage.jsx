import React from "react";
import { Link } from "react-router-dom";
import { Code, Clock } from "lucide-react";

const FallBackPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center font-inter bg-gradient-to-br from-neet-neutral via-neet-neutral-focus to-neet-neutral">
      <div className="w-full max-w-sm mx-auto bg-neet-neutral/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-neet-base-100/30 flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-neet-base-100/10 backdrop-blur-sm flex items-center justify-center shadow-lg border border-neet-base-100/20 mb-2">
            <Clock className="w-6 h-6 text-neet-accent animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-neet-base-100 text-center">
            Coming Soon!
          </h1>
          <p className="text-neet-accent/80 text-sm text-center">
            This section is under construction.<br />
            Stay tuned for updates.
          </p>
        </div>
        <Link
          to="/"
          className="mt-4 btn w-full py-3 bg-gradient-to-r from-neet-primary to-neet-secondary hover:from-neet-secondary hover:to-neet-accent text-neet-primary-content font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl border-none flex items-center justify-center gap-2"
        >
          <Code className="w-5 h-5" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default FallBackPage;
