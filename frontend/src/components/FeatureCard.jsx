import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PatternExplorerCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Pattern tags data
  const patternTags = [
    { id: 1, text: "Arrays", color: "bg-neet-primary", textColor: "text-white", top: "top-4", left: "left-4", rotation: "-rotate-6" },
    { id: 2, text: "Sliding Window", color: "bg-neet-secondary", textColor: "text-white", top: "top-10", left: "right-6", rotation: "rotate-8" },
    { id: 3, text: "Hashing", color: "bg-neet-accent", textColor: "text-white", top: "bottom-8", left: "left-6", rotation: "-rotate-4" },
    { id: 4, text: "Dynamic Programming", color: "bg-neet-success", textColor: "text-white", top: "bottom-4", left: "right-4", rotation: "rotate-10" },
    { id: 5, text: "Binary Search", color: "bg-neet-warning", textColor: "text-white", top: "top-1/2", left: "left-1/2", rotation: "rotate-12", center: true }
  ];

  return (
    <div className="col-span-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-neet-base-100 to-neet-base-200 p-4">
      <Link
        to="/patterns"
        className="relative w-full max-w-3xl h-80 bg-neet-base-100 border border-neet-neutral/30 hover:bg-neet-neutral hover:border-neet-primary rounded-2xl p-6 flex items-center justify-center overflow-hidden hover:shadow-xl transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Central text */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <span className="text-7xl font-bold text-neet-neutral/10 group-hover:text-neet-neutral/20 transition-all duration-500">
            Patterns
          </span>
        </div>
        
        {/* Floating pattern tags */}
        <div className="relative w-full h-full flex flex-wrap gap-2 items-center justify-center z-10">
          {patternTags.map(tag => (
            <div 
              key={tag.id}
              className={`
                absolute ${tag.top} ${tag.left} 
                ${tag.color} ${tag.textColor} 
                font-medium text-xs px-3 py-1 rounded-full shadow 
                transition-all duration-500 ease-in-out
                ${tag.center ? 'transform -translate-x-1/2 -translate-y-1/2' : ''}
                ${isHovered ? 'rotate-0 translate-y-0' : tag.rotation}
                ${isHovered ? 'animate-none' : 'animate-float'}
              `}
              style={{
                animationDelay: `${tag.id * 0.2}s`,
                transitionProperty: 'transform, background-color, color',
                zIndex: tag.id
              }}
            >
              {tag.text}
            </div>
          ))}
        </div>
        
        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-neet-neutral/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Explore button - appears on hover */}
        <div className={`
          absolute bottom-6 px-6 py-3 bg-neet-primary text-white font-medium rounded-full
          transform transition-all duration-500
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          shadow-lg hover:shadow-xl hover:scale-105
          z-20
        `}>
          Explore Patterns →
        </div>
      </Link>
    </div>
  );
};

export default PatternExplorerCard;