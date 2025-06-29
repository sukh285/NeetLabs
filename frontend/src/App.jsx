import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {

  let authUser = null;

  return (
    <div className="flex flex-col items-center justify-start">
      {/* for notifications */}
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
