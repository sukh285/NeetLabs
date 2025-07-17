import React, { useEffect, useState } from "react";

const ProgressBar = ({ label = "Completion", percentage = 0 }) => {
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidth(`${percentage}%`);
    });
  }, [percentage]);

  const getBarColor = (value) => {
    if (value < 40) return "bg-red-700"; // low progress
    if (value < 70) return "bg-yellow-400"; // medium progress
    return "bg-green-500"; // high progress
  };

  return (
    <div className="my-6 max-w-2xl mx-auto text-center">
      <div className="flex justify-between mb-2 text-sm font-medium text-neet-accent/70 px-1">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-4 rounded-full bg-neet-accent/10 overflow-hidden backdrop-blur-md shadow-inner shadow-neet-base-100/10 border border-neet-accent/20">
        <div
          className={`h-full ${getBarColor(
            percentage
          )} transition-all duration-1000 ease-in-out`}
          style={{ width }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
