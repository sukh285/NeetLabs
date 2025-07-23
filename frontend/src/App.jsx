import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { HashLoader } from "react-spinners";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import Layout from "./layout/Layout";
import AdminRoute from "./components/AdminRoute";
import AddProblem from "./pages/AddProblem";
import AllProblems from "./pages/AllProblems";
import ProblemPage from "./pages/ProblemPage";
import ProfilePage from "./pages/ProfilePage";
import AllPlaylists from "./pages/AllPlaylists";
import PlaylistPage from "./pages/PlaylistPage";
import UpdateProblem from "./pages/UpdateProblem";
import PricingPage from "./pages/PricingPage";
import FeedbackPage from "./pages/FeedbackPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-neet-neutral">
        <HashLoader color="#FF9800" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start">
      <Toaster />
      <Routes>
        {/* Protected Routes with Layout */}

        <Route path="/" element={<Layout />}>
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route index element={<HomePage />} />
          <Route
            path="problems"
            element={authUser ? <AllProblems /> : <Navigate to="/login" />}
          />

          <Route element={<AdminRoute />}>
            <Route
              path="add-problem"
              element={authUser ? <AddProblem /> : <Navigate to="/" />}
            />
            <Route
              path="update-problem/:problemId"
              element={authUser ? <UpdateProblem /> : <Navigate to="/" />}
            />
          </Route>

          <Route
            path="profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />

          <Route
            path="playlists"
            element={authUser ? <AllPlaylists /> : <Navigate to="/login" />}
          />

          <Route
            path="/pricing"
            element={<PricingPage />}
          />

          <Route
            path="/feedback"
            element={authUser ? <FeedbackPage /> : <Navigate to="/login" />}
          />
          {/* Playlist by ID route */}
          <Route
            path="playlist/:playlistId"
            element={authUser ? <PlaylistPage /> : <Navigate to="/login" />}
          />
        </Route>

        <Route
          path="problem/:id"
          element={authUser ? <ProblemPage /> : <Navigate to="/login" />}
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
