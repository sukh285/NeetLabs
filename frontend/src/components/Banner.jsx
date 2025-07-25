import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const Banner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed top-18 left-0 w-full z-[99] bg-neet-primary/80 text-neet-neutral border-b px-4 py-4 text-xs flex items-center justify-center font-inter">
      <div className="flex items-center justify-center gap-2">
        <span className="font-semibold">NeetLabs is in beta!</span>
        <span>
          We'd love your feedback via the{' '}
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
