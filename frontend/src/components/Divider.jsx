import React from 'react';
import { Sparkles } from 'lucide-react';

const PlaylistDivider = () => {
  return (
    <div className="py-8 px-4">
      {/* Option 1: Gradient line with center icon */}
      <div className="relative flex items-center">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neet-accent/20 to-transparent"></div>
        <div className="px-4">
          <div className="w-8 h-8 bg-neet-neutral/40 backdrop-blur-xl rounded-full border border-neet-accent/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-neet-accent/60" />
          </div>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neet-accent/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default PlaylistDivider;
