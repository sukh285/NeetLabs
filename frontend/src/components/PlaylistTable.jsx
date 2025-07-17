import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, Search } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

// Reuse from ProblemTable
const getDifficultyBadgeClasses = (difficulty) => {
  switch (difficulty) {
    case "EASY":
      return "badge badge-success badge-sm font-semibold text-green-800 bg-green-400 border-green-800";
    case "MEDIUM":
      return "badge badge-warning badge-sm font-semibold text-yellow-900 bg-yellow-400 border-yellow-800";
    case "HARD":
      return "badge badge-error badge-sm font-semibold text-red-800 bg-red-400 border-red-800";
    default:
      return "badge badge-neutral badge-sm font-semibold text-gray-700 bg-gray-400 border-gray-800";
  }
};

const TagsDisplay = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  const displayTags = tags.slice(0, 2);
  const remainingTags = tags.slice(2);
  return (
    <div className="flex items-center gap-1 flex-wrap font-inter">
      {displayTags.map((tag, idx) => (
        <span
          key={idx}
          className="px-2 py-1 text-xs font-medium rounded-md bg-neet-neutral/40 text-neet-accent/80 border border-neet-accent/20"
        >
          {tag}
        </span>
      ))}
      {remainingTags.length > 0 && (
        <div className="relative group">
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-neet-accent/10 text-neet-accent cursor-pointer hover:bg-neet-accent/20 transition-colors duration-200 border border-neet-accent/30">
            +{remainingTags.length} more
          </span>
          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50 min-w-max">
            <div className="bg-neet-neutral/95 backdrop-blur-xl rounded-lg p-3 shadow-2xl border border-neet-accent/20">
              <div className="flex flex-wrap gap-1 max-w-xs">
                {remainingTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs font-medium rounded-md bg-neet-accent/20 text-neet-accent/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PlaylistTable = ({ problems, playlistId }) => {
  const { authUser } = useAuthStore();
  return (
    <div className="w-full mt-10 bg-neet-neutral/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-neet-accent/10">
      <div className="overflow-hidden rounded-2xl bg-neet-neutral/30 backdrop-blur-sm border border-neet-accent/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neet-neutral/50 backdrop-blur-sm">
              <tr>
                <th className="text-left py-4 px-6 text-neet-accent/80 font-semibold text-sm uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-6 max-w-0.5 text-neet-accent/80 font-semibold text-sm uppercase tracking-wider">
                  Problem
                </th>
                <th className="text-left py-4 px-6 text-neet-accent/80 font-semibold text-sm uppercase tracking-wider">
                  Tags
                </th>
                <th className="text-left py-4 px-6 text-neet-accent/80 font-semibold text-sm uppercase tracking-wider">
                  Difficulty
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neet-accent/10">
              {problems && problems.length > 0 ? (
                problems.map((problem) => {
                  const isSolved = problem.solvedProblems?.some(
                    (user) => user.userId === authUser?.id
                  );
                  return (
                    <tr
                      key={problem.id}
                      className="hover:bg-neet-neutral/20 transition-colors duration-200 group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          {isSolved ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-neet-accent/40" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          to={`/problem/${problem.id}`}
                          state={{ fromPlaylistId: playlistId }}
                          className="text-neet-base-100 hover:text-neet-primary transition-colors duration-200 font-medium group-hover:underline"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <TagsDisplay tags={problem.tags} />
                      </td>
                      <td className="py-4 px-6">
                        <span className={getDifficultyBadgeClasses(problem.difficulty)}>
                          {problem.difficulty}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-neet-accent/10 flex items-center justify-center">
                        <Search className="w-8 h-8 text-neet-accent/50" />
                      </div>
                      <div>
                        <h3 className="text-neet-base-100 font-medium mb-1">No problems in this playlist</h3>
                        <p className="text-neet-accent/60 text-sm">Add problems to curate your own challenges!</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlaylistTable;
