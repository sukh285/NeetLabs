import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Code, ChevronRight, Target, Zap, Users } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";
import Hero from "./sections/Hero";
import Second from "./sections/Second";
import Third from "./sections/Third";
import FullPageLoader from "../templates/FullPageLoader";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthStore();

  useEffect(() => {
    // Simulate loading or wait for assets/data
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time if needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* {loading && <FullPageLoader />} */}

      <div
        className={`min-h-screen bg-neet-base-100 w-full overflow-x-hidden font-inter`}
      >
        {/* Hero Section */}
        <Hero />
        {/* Problems Section */}
        <Second />
        {/* Playlists Section */}
        <Third />
      </div>
    </>
  );
};

export default HomePage;
