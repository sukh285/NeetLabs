import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const loadingMessages = [
  "Loading the magic...",
  "Crunching numbers...",
  "Preparing awesomeness...",
  "Almost there...",
  "Booting up modules...",
  "Summoning the code spirits...",
  "Optimizing performance...",
  "Fetching fun facts...",
  "Aligning the stars...",
  "Warming up the engines...",
];

const getRandomIndex = (excludeIndex, length) => {
  let idx;
  do {
    idx = Math.floor(Math.random() * length);
  } while (idx === excludeIndex && length > 1);
  return idx;
};

const FullPageLoader = () => {
  const [messageIndex, setMessageIndex] = useState(() =>
    getRandomIndex(-1, loadingMessages.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => getRandomIndex(prev, loadingMessages.length));
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-neet-base-100">
      <HashLoader color="#ff9800" />
      <div className="mt-6 px-6 py-3 rounded-xl bg-neet-neutral shadow-lg flex items-center gap-2">
        <span className="font-semibold text-neet-primary text-base font-inter tracking-wide select-none drop-shadow-sm">
          {loadingMessages[messageIndex]}
        </span>
      </div>
    </div>
  );
};

export default FullPageLoader;
