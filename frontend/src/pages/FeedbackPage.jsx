import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Star, Send, Code } from "lucide-react";

const FeedbackPage = () => {
  const { authUser } = useAuthStore();

  const [issues, setIssues] = useState("");
  const [liked, setLiked] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!authUser) {
      toast.error("Login to fill feedback form");
      return;
    }

    // Simulate submission
    console.log({
      user: authUser?.name || "Anonymous",
      issues,
      liked,
      rating,
    });

    toast.success("Thanks for your feedback!");

    setIssues("");
    setLiked("");
    setRating(5);
  };

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
            We Value Your Feedback
          </h2>
          <p className="text-neet-neutral/80 text-xs text-center max-w-xs">
            Help us improve NeetLabs by sharing your thoughts!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Issues */}
          <div>
            <label className="text-xs font-semibold text-neet-neutral">
              Issues or Bugs You Found:
            </label>
            <textarea
              className="mt-1 w-full p-2 rounded-xl border border-neet-base-200/40 bg-neet-base-100/80 focus:outline-none focus:ring-2 focus:ring-neet-primary text-neet-neutral placeholder-neet-neutral/50 resize-none text-xs"
              rows="2"
              placeholder="Describe any problems or bugs you encountered..."
              value={issues}
              onChange={(e) => setIssues(e.target.value)}
            />
          </div>

          {/* Liked */}
          <div>
            <label className="text-xs font-semibold text-neet-neutral">
              One Thing You Liked:
            </label>
            <input
              className="mt-1 w-full p-2 rounded-xl border border-neet-base-200/40 bg-neet-base-100/80 focus:outline-none focus:ring-2 focus:ring-neet-primary text-neet-neutral placeholder-neet-neutral/50 text-xs"
              placeholder="Something that stood out positively..."
              value={liked}
              onChange={(e) => setLiked(e.target.value)}
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-xs font-semibold text-neet-neutral">
              Rate Us (Out of 10):
            </label>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="range"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full accent-neet-primary"
              />
              <div className="text-neet-primary font-bold text-base flex items-center gap-1">
                <Star className="w-4 h-4" />
                {rating}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-neet-primary to-neet-secondary hover:from-neet-secondary hover:to-neet-accent text-white font-semibold rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            <Send className="w-4 h-4" />
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
