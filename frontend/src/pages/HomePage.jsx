import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Code, ChevronRight, Target, Zap, Users } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";
import Hero from "./sections/Hero";
import Second from "./sections/Second";
import Third from "./sections/Third";
import FullPageLoader from "../templates/FullPageLoader";
import Grid from "./sections/Grid";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthStore();

  return (
    <>
      {/* {loading && <FullPageLoader />} */}

      <div
        className={`min-h-screen bg-neet-base-100 w-full overflow-x-hidden font-inter`}
      >
        {/* Hero Section */}
        <Hero />
        {/* Grid */}
        {/* <Grid /> */}
        
        {/* Problems Section */}
        <Second />
        {/* Playlists Section */}
        <Third />
      </div>
    </>
  );
};

export default HomePage;
