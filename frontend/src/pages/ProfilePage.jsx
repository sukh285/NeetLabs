import React, { useEffect, useState } from "react";
import { useProfileStore } from "../store/useProfileStore";
import {
  Loader2,
  BadgeCheck,
  CheckCircle,
  Flame,
  Target,
  Timer,
  User,
  Calendar,
  Award,
  TrendingUp,
} from "lucide-react";
import moment from "moment";

import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import SubmissionLineChart from "../components/SubmissionLineChart";
import DifficultyPieChart from "../components/DifficultyPieChart";
import SubmissionHeatmap from "../components/Heatmap";

const AVATAR_PLACEHOLDER = "https://avatar.iran.liara.run/public/boy";

const ProfilePage = () => {
  const { profile, user, stats, isLoading, fetchProfile } = useProfileStore();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  if (isLoading || !user || !stats) {
    return (
      <div className="min-h-screen font-inter bg-gradient-to-br from-neet-neutral via-neet-neutral-focus to-neet-neutral">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative">
            <div className="w-10 h-10 border-2 border-neet-accent/20 border-t-neet-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-10 h-10 border-2 border-transparent border-r-neet-secondary rounded-full animate-spin animate-reverse"></div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-base font-semibold text-neet-base-100 mb-1">
              Loading Profile
            </h3>
            <p className="text-neet-accent/60 text-xs">
              Fetching your coding journey...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-neet-neutral via-neet-neutral-focus to-neet-neutral">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-20">
        {/* User Info Card */}
        <div className="mb-4 pointer-events-none">
          <div className="bg-neet-neutral/60 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-4 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-neet-primary/20 to-neet-secondary/20 rounded-full blur-lg"></div>
                <img
                  src={user.image || AVATAR_PLACEHOLDER}
                  alt="User avatar"
                  className="relative w-20 h-20 rounded-full border-2 border-neet-primary/30 object-cover shadow-lg"
                />
              </div>

              {/* User Info and Join Info */}
              <div className="flex-1 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* User Name & Email - vertically centered beside avatar */}
                <div className="flex flex-col justify-center items-center md:items-start flex-1">
                  <h1 className="text-xl font-bold text-neet-base-100 mb-1 flex items-center gap-2">
                    {user.name || "Unnamed User"}
                    {user.role === "ADMIN" && (
                      <span className="px-2 py-0.5 bg-neet-primary/20 text-neet-primary text-[10px] font-semibold rounded-full border border-neet-primary/30">
                        Admin
                      </span>
                    )}
                  </h1>
                  <p className="text-neet-accent/80 text-sm mb-2">
                    {user.email}
                  </p>

                  {/* Plan Section - inline style */}
                  <div className="flex items-center gap-2">
                    <span className="text-neet-accent/70 text-xs font-medium">
                      Current Plan:
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                        user?.plan === "FREE"
                          ? "bg-neet-neutral/40 text-neet-accent/80 border-neet-accent/20"
                          : user?.plan === "PRO"
                          ? "bg-neet-secondary/20 text-neet-secondary border-neet-secondary/30"
                          : user?.plan === "ADVANCED"
                          ? "bg-neet-primary/20 text-neet-primary border-neet-primary/30"
                          : "bg-neet-neutral/40 text-neet-accent/80 border-neet-accent/20"
                      }`}
                    >
                      {user?.plan || "Unknown"}
                    </span>
                  </div>
                </div>

                {/* Join Info - more spacious and visually separated */}
                <div className="flex flex-col items-center md:items-end bg-neet-neutral/30 rounded-xl px-5 py-3 border border-neet-accent/10 shadow-md">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-neet-secondary" />
                    <span className="text-neet-accent/70 text-xs font-medium">
                      Member Since
                    </span>
                  </div>
                  <div className="text-neet-base-100 font-semibold text-base">
                    {moment(user.createdAt).format("MMM D, YYYY")}
                  </div>
                  <div className="text-neet-accent/60 text-xs mt-1">
                    {moment(user.createdAt).fromNow(true)} ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
          {[
            {
              label: "Problems Solved",
              value: stats.problemsSolved,
              icon: CheckCircle,
              color: "from-neet-success/20 to-neet-success/5",
              iconColor: "text-neet-success",
              borderColor: "border-neet-success/20",
            },
            {
              label: "Total Submissions",
              value: stats.totalSubmissions,
              icon: Flame,
              color: "from-neet-warning/20 to-neet-warning/5",
              iconColor: "text-neet-warning",
              borderColor: "border-neet-warning/20",
            },
            {
              label: "Accepted Submissions",
              value: stats.acceptedSubmissions,
              icon: BadgeCheck,
              color: "from-neet-primary/20 to-neet-primary/5",
              iconColor: "text-neet-primary",
              borderColor: "border-neet-primary/20",
            },
            {
              label: "Accuracy Rate",
              value: stats.accuracyRate || "—",
              icon: Target,
              color: "from-neet-info/20 to-neet-info/5",
              iconColor: "text-neet-info",
              borderColor: "border-neet-info/20",
            },
            {
              label: "Last Submission",
              value: stats.lastSubmissionAt
                ? moment(stats.lastSubmissionAt).fromNow()
                : "—",
              icon: Timer,
              color: "from-neet-accent/20 to-neet-accent/5",
              iconColor: "text-neet-accent",
              borderColor: "border-neet-accent/20",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${item.color} backdrop-blur-xl rounded-2xl border ${item.borderColor} p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div
                  className={`p-2 rounded-full bg-neet-neutral/40 ${item.iconColor} shadow-lg`}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="text-lg font-bold text-neet-base-100">
                  {item.value}
                </div>
                <div className="text-xs text-neet-accent/70 font-medium">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Line Chart (2 cols) */}
          <div className="lg:col-span-2 bg-neet-neutral/60 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-4 shadow-2xl">
            <h2 className="text-lg font-bold text-neet-base-100 mb-4">
              Submission Trend
            </h2>
            {stats.submissionTrends.length > 0 ? (
              <SubmissionLineChart data={stats.submissionTrends} />
            ) : (
              <p className="text-neet-accent/60 text-sm">
                No submission data available yet.
              </p>
            )}
          </div>

          {/* Pie Chart or Difficulty Distribution */}
          <div className="bg-neet-neutral/60 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-4 shadow-2xl">
            <h2 className="text-lg font-bold text-neet-base-100 mb-4">
              Difficulty Breakdown
            </h2>
            <DifficultyPieChart stats={stats.solvedDifficulty} />
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="mb-4">
          <div className="bg-neet-neutral/60 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-4 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-neet-secondary" />
              <h2 className="text-lg font-bold text-neet-base-100">
                Solved by Difficulty
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  label: "Easy",
                  value: stats.solvedDifficulty?.EASY || 0,
                  color: "from-neet-success/20 to-neet-success/5",
                  textColor: "text-neet-success",
                  borderColor: "border-neet-success/30",
                },
                {
                  label: "Medium",
                  value: stats.solvedDifficulty?.MEDIUM || 0,
                  color: "from-neet-warning/20 to-neet-warning/5",
                  textColor: "text-neet-warning",
                  borderColor: "border-neet-warning/30",
                },
                {
                  label: "Hard",
                  value: stats.solvedDifficulty?.HARD || 0,
                  color: "from-neet-error/20 to-neet-error/5",
                  textColor: "text-neet-error",
                  borderColor: "border-neet-error/30",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${item.color} backdrop-blur-xl rounded-xl border ${item.borderColor} p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  <div
                    className={`text-2xl font-extrabold ${item.textColor} mb-1`}
                  >
                    {item.value}
                  </div>
                  <div className="text-neet-base-100 font-semibold text-base">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-neet-neutral/60 backdrop-blur-xl rounded-2xl border border-neet-accent/10 p-4 shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-neet-secondary" />
            <h2 className="text-lg font-bold text-neet-base-100">
              Recent Submissions
            </h2>
          </div>

          {stats.recentSubmissions.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-10 h-10 mx-auto mb-2 bg-neet-neutral/40 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-neet-accent/40" />
              </div>
              <p className="text-neet-accent/60 text-base">
                No recent submissions found.
              </p>
              <p className="text-neet-accent/40 text-xs mt-1">
                Start solving problems to see your progress here!
              </p>
            </div>
          ) : (
            <div className="bg-neet-neutral/40 rounded-xl border border-neet-accent/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neet-neutral/60 border-b border-neet-accent/10">
                      <th className="text-left p-2 text-neet-base-100 font-semibold">
                        Problem
                      </th>
                      <th className="text-left p-2 text-neet-base-100 font-semibold">
                        Difficulty
                      </th>
                      <th className="text-left p-2 text-neet-base-100 font-semibold">
                        Status
                      </th>
                      <th className="text-left p-2 text-neet-base-100 font-semibold">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentSubmissions.map((submission, idx) => (
                      <tr
                        key={submission.id}
                        className={`border-b border-neet-accent/5 ${
                          idx % 2 === 0
                            ? "bg-neet-neutral/20"
                            : "bg-transparent"
                        } hover:bg-neet-accent/5 transition-colors`}
                      >
                        <td className="p-2 text-neet-base-100 font-medium">
                          {submission.problem?.title}
                        </td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              submission.problem?.difficulty === "EASY"
                                ? "bg-neet-success/20 text-neet-success border border-neet-success/30"
                                : submission.problem?.difficulty === "MEDIUM"
                                ? "bg-neet-warning/20 text-neet-warning border border-neet-warning/30"
                                : "bg-neet-error/20 text-neet-error border border-neet-error/30"
                            }`}
                          >
                            {submission.problem?.difficulty}
                          </span>
                        </td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              submission.status === "Accepted"
                                ? "bg-neet-success/20 text-neet-success border border-neet-success/30"
                                : "bg-neet-error/20 text-neet-error border border-neet-error/30"
                            }`}
                          >
                            {submission.status}
                          </span>
                        </td>
                        <td className="p-2 text-neet-accent/70">
                          {moment(submission.createdAt).fromNow()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Submission Heatmap Section */}
          <SubmissionHeatmap data={stats.submissionTrends} />
        </div>

        {/* Delete Profile Button */}
        <div className="flex justify-end mt-8 mb-8">
          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-neet-error/20 to-neet-error/10 hover:from-neet-error/30 hover:to-neet-error/20 text-neet-error border border-neet-error/30 shadow-md transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            Delete My Profile
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          useProfileStore.getState().deleteProfile();
        }}
      />
    </div>
  );
};

export default ProfilePage;
