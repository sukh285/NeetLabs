import React, { useState, useRef, useEffect } from "react";
import { Loader } from "lucide-react";

// Fallback loader
const Fallback = () => (
  <div className="w-full h-[70vh] flex items-center justify-center">
    <Loader className="w-6 h-6 animate-spin text-neet-primary" />
  </div>
);

// Lazy load the model
const LazyBotModel = React.lazy(() =>
  import("./Spline").then((mod) => ({
    default: mod.BotModel,
  }))
);

const BotModelLoader = () => {
  const ref = useRef(null);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowModel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 } // triggers earlier
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className="w-full h-[70vh]">
      {showModel ? (
        <React.Suspense fallback={<Fallback />}>
          <LazyBotModel />
        </React.Suspense>
      ) : (
        <Fallback />
      )}
    </div>
  );
};

export default BotModelLoader;
