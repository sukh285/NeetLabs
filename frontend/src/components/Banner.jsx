import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const BANNER_DISMISSED_KEY = "neetlabs_banner_dismissed";

const Banner = () => {
  const [visible, setVisible] = useState(() => {
    // Only show if not dismissed before
    return !localStorage.getItem(BANNER_DISMISSED_KEY);
  });
  const { authUser } = useAuthStore();

  useEffect(() => {
    // If banner is not visible, ensure it's marked as dismissed
    if (!visible) {
      localStorage.setItem(BANNER_DISMISSED_KEY, "1");
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      data-aos="fade-down"
      data-aos-duration="8000"
      className={`fixed ${
        authUser ? "top-20" : "top-18"
      } left-0 w-full z-[99] bg-neet-primary/80 text-neet-neutral border-b px-4 py-4 text-xs flex items-center justify-center font-inter`}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="font-semibold">NeetLabs is in beta!</span>
        <span>
          We'd love your feedback via the{" "}
          <Link
            to="/feedback"
            className="underline text-neet-neutral font-bold hover:text-neet-neutral/30"
          >
            feedback page
          </Link>
          .
        </span>
      </div>
      <button
        className="ml-4 text-neet-primary rounded-sm bg-neet-neutral/90 hover:bg-neet-neutral/30"
        onClick={() => setVisible(false)}
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Banner;
