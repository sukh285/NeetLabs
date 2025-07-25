import React, { useState, useMemo } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useProblemStore } from "../store/useProblemStore";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import Divider from "../templates/Divider";

// You can eventually extract this as a modal
const ShowAllTagsModal = ({ tags, selectedTags, onToggle, onClose }) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-neet-neutral/10 backdrop-blur-xl p-6 rounded-2xl border border-neet-accent/20 max-w-2xl w-full">
      <h3 className="text-lg text-neet-base-100 font-semibold mb-4">
        All Tags
      </h3>
      <div className="w-full h-px my-4 bg-gradient-to-r from-transparent via-neet-accent/40 to-transparent" />
      <div className="grid grid-cols-3 gap-2 max-h-72 overflow-y-auto mb-4">
        {tags.map((tag) => (
          <label
            key={tag}
            className="flex items-center gap-2 text-neet-base-100 text-sm"
          >
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => onToggle(tag)}
              className="form-checkbox accent-neet-accent"
            />
            {tag}
          </label>
        ))}
      </div>
      <button
        className="w-full mt-2 py-2 bg-neet-accent/20 text-neet-accent rounded-lg"
        onClick={onClose}
      >
        Done
      </button>
    </div>
  </div>
);

const ProblemFilters = ({
  selectedDifficulties,
  setSelectedDifficulties,
  solvedStatus,
  setSolvedStatus,
  selectedTags,
  setSelectedTags,
}) => {
  const { problems } = useProblemStore();
  const { authUser } = useAuthStore();
  const [showAllTagsModal, setShowAllTagsModal] = useState(false);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [problems]);

  const shortTags = allTags.slice(0, 4);
  const longTags = allTags.slice(4);

  const toggleDifficulty = (level) => {
    setSelectedDifficulties((prev) =>
      prev.includes(level) ? prev.filter((d) => d !== level) : [...prev, level]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedDifficulties([]);
    setSolvedStatus("");
    setSelectedTags([]);
  };

  return (
    <div data-aos="fade-right"
    data-aos-duration="1000" className="font-inter bg-neet-neutral/30 border border-neet-accent/20 rounded-2xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-neet-base-100 text-lg font-semibold">Filters</h3>
        <button
          className="text-neet-accent/70 text-sm hover:text-neet-accent transition"
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>

      {/* Difficulty */}
      <div className="mb-6">
        <h4 className="text-neet-base-100 font-medium text-sm mb-2">
          Difficulty
        </h4>
        <div className="flex flex-col gap-2 text-sm text-neet-accent/80">
          {["EASY", "MEDIUM", "HARD"].map((level) => (
            <label key={level} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedDifficulties.includes(level)}
                onChange={() => toggleDifficulty(level)}
                className="form-checkbox accent-neet-accent"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      {/* SOLVED Status */}
      <div className="mb-6">
        <h4 className="text-neet-base-100 font-medium text-sm mb-2">Status</h4>
        <div className="flex flex-col gap-2 text-sm text-neet-accent/80">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              checked={solvedStatus === "SOLVED"}
              onChange={() => setSolvedStatus("SOLVED")}
              className="form-radio accent-neet-accent"
            />
            SOLVED
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              checked={solvedStatus === "UNSOLVED"}
              onChange={() => setSolvedStatus("UNSOLVED")}
              className="form-radio accent-neet-accent"
            />
            UNSOLVED
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              checked={solvedStatus === ""}
              onChange={() => setSolvedStatus("")}
              className="form-radio accent-neet-accent"
            />
            Any
          </label>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h4 className="text-neet-base-100 font-medium text-sm mb-2">Tags</h4>
        <div className="flex flex-col gap-2 text-sm text-neet-accent/80">
          {shortTags.map((tag) => (
            <label key={tag} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="form-checkbox accent-neet-accent"
              />
              {tag}
            </label>
          ))}
        </div>
        {longTags.length > 0 && (
          <button
            className="mt-2 text-sm text-neet-accent/70 hover:text-neet-accent transition flex items-center gap-1"
            onClick={() => setShowAllTagsModal(true)}
          >
            Show More <ChevronDown className="w-3 h-3" />
          </button>
        )}
      </div>

      {showAllTagsModal && (
        <ShowAllTagsModal
          tags={allTags}
          selectedTags={selectedTags}
          onToggle={toggleTag}
          onClose={() => setShowAllTagsModal(false)}
        />
      )}
    </div>
  );
};

export default ProblemFilters;
