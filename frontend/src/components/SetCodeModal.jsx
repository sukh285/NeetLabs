import React, { useState } from "react";

const SetCodeModal = ({ isOpen, onClose, onLoad }) => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");

  const handleLoad = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setError("");
      onLoad(parsed);
      onClose();
    } catch (e) {
      setError("Invalid JSON: " + e.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-neet-neutral p-6 rounded-2xl shadow-2xl w-full max-w-lg relative">
        <h2 className="text-lg font-bold mb-4 text-neet-base-100">Paste Problem JSON</h2>
        <textarea
          className="w-full h-40 p-3 rounded-lg border border-neet-accent/20 bg-neet-neutral/30 text-neet-base-100 mb-2 focus:outline-none focus:ring-2 focus:ring-neet-primary/20"
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
          placeholder="Paste a valid problem JSON object here..."
        />
        {error && <p className="text-neet-error text-sm mb-2">{error}</p>}
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-4 py-2 rounded-lg bg-neet-error/20 text-neet-error font-medium hover:bg-neet-error/30 transition-all"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-neet-primary text-white font-medium hover:bg-neet-secondary transition-all"
            onClick={handleLoad}
            type="button"
          >
            Load JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetCodeModal; 