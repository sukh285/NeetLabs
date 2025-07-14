"use client";

import React, { useRef } from "react";
import { Confetti, ConfettiButton, ConfettiRef } from "canvas-confetti"; // Adjust the import path if needed

export default function ConfettiExamplePage() {
  const confettiRef = useRef < ConfettiRef > null;

  const handleFireClick = () => {
    confettiRef.current?.fire({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Canvas for confetti */}
      <Confetti
        ref={confettiRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
      />

      <h1 className="text-3xl font-bold mb-6">Celebrate with Confetti! 🎉</h1>

      {/* Custom fire button */}
      <button
        onClick={handleFireClick}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Fire Confetti!
      </button>

      {/* Built-in ConfettiButton */}
      <ConfettiButton
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        options={{
          particleCount: 100,
          spread: 100,
          scalar: 1.2,
        }}
      >
        Click Me for Confetti!
      </ConfettiButton>
    </div>
  );
}
