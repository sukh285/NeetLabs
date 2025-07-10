import React, { useEffect } from "react";
import { useProfileStore } from "../store/useProfileStore";
import { Loader2, BadgeCheck, CheckCircle, Flame, Target, Timer } from "lucide-react";
import moment from "moment";

const AVATAR_PLACEHOLDER = "https://avatar.iran.liara.run/public/boy";

const ProfilePage = () => {
  const { profile, user, stats, isLoading, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  if (isLoading || !user || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        

        {/* User Info */}
        <div className="card bg-base-100 border border-base-300 shadow-md">
          <div className="card-body">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={user.image || AVATAR_PLACEHOLDER}
                  alt="User avatar"
                  className="w-24 h-24 rounded-full border-4 border-primary/30 object-cover shadow"
                />
              </div>
              {/* Info */}
              <div className="flex-1 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                    {user.name || "Unnamed User"}
                    {user.role === "ADMIN" && (
                      <span className="badge badge-primary text-xs font-semibold ml-2">Admin</span>
                    )}
                  </h2>
                  <p className="text-sm text-base-content/70 mb-1">
                    {user.email}
                  </p>
                  
                </div>
                <div className="text-sm text-base-content/50 md:text-right">
                  <span className="block">
                    Joined{" "}
                    <span className="font-medium text-base-content">
                      {moment(user.createdAt).format("MMMM D, YYYY")}
                    </span>
                  </span>
                  <span className="block mt-1">
                    Member for {moment(user.createdAt).fromNow(true)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            {
              label: "Problems Solved",
              value: stats.problemsSolved,
              icon: (
                <CheckCircle className="w-7 h-7 text-success drop-shadow" />
              ),
              color: "bg-success/10",
            },
            {
              label: "Total Submissions",
              value: stats.totalSubmissions,
              icon: <Flame className="w-7 h-7 text-warning drop-shadow" />,
              color: "bg-warning/10",
            },
            {
              label: "Accepted Submissions",
              value: stats.acceptedSubmissions,
              icon: (
                <BadgeCheck className="w-7 h-7 text-primary drop-shadow" />
              ),
              color: "bg-primary/10",
            },
            {
              label: "Accuracy Rate",
              value: stats.accuracyRate || "—",
              icon: <Target className="w-7 h-7 text-info drop-shadow" />,
              color: "bg-info/10",
            },
            {
              label: "Last Submission",
              value: stats.lastSubmissionAt
                ? moment(stats.lastSubmissionAt).fromNow()
                : "—",
              icon: <Timer className="w-7 h-7 text-base-content/70 drop-shadow" />,
              color: "bg-base-200",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`card border-0 shadow-md rounded-2xl ${item.color} transition-transform hover:scale-[1.03]`}
            >
              <div className="card-body flex flex-col items-center gap-2 p-6">
                <div className="p-3 rounded-full bg-base-100 shadow">{item.icon}</div>
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-sm text-base-content/70 text-center">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Difficulty Breakdown */}
        <div className="card bg-base-100 border border-base-300 shadow-lg rounded-2xl">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4 text-base-content">
              Solved by Difficulty
            </h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {[
                {
                  label: "Easy",
                  value: stats.solvedDifficulty?.EASY || 0,
                  color: "bg-success/10 text-success border-success/30",
                },
                {
                  label: "Medium",
                  value: stats.solvedDifficulty?.MEDIUM || 0,
                  color: "bg-warning/10 text-warning border-warning/30",
                },
                {
                  label: "Hard",
                  value: stats.solvedDifficulty?.HARD || 0,
                  color: "bg-error/10 text-error border-error/30",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex-1 flex flex-col items-center justify-center p-6 rounded-xl border ${item.color} shadow-sm`}
                >
                  <div className="text-3xl font-extrabold mb-1">{item.value}</div>
                  <div className="text-base font-medium tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="card bg-base-100 border border-base-300 shadow-lg rounded-2xl">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-base-content">
                Recent Submissions
              </h2>
            </div>
            {stats.recentSubmissions.length === 0 ? (
              <p className="text-base-content/60 text-sm">
                No recent submissions found.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-base-200">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-base-200 text-base-content/80">
                      <th>Problem</th>
                      <th>Difficulty</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentSubmissions.map((submission) => (
                      <tr key={submission.id}>
                        <td className="font-medium">
                          {submission.problem?.title}
                        </td>
                        <td>
                          <span
                            className={`badge px-3 py-1 text-xs font-semibold ${
                              submission.problem?.difficulty === "EASY"
                                ? "badge-success/20 text-success"
                                : submission.problem?.difficulty === "MEDIUM"
                                ? "badge-warning/20 text-warning"
                                : "badge-error/20 text-error"
                            }`}
                          >
                            {submission.problem?.difficulty}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge px-3 py-1 text-xs font-semibold ${
                              submission.status === "Accepted"
                                ? "badge-success"
                                : "badge-error"
                            }`}
                          >
                            {submission.status}
                          </span>
                        </td>
                        <td>{moment(submission.createdAt).fromNow()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
