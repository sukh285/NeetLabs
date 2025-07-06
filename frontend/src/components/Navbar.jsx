import React from "react";
import { User, Code, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { authUser } = useAuthStore();
  

  return (
    <>
      {/* Navbar */}
      <nav className="navbar bg-base-100 border-b border-base-300 px-4 lg:px-8 shadow-sm w-full max-w-full py-2">
        <div className="navbar-start w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </div>
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xl font-bold hidden sm:block">
                    LeetLab
                  </span>
                </Link>
              </div>
            </div>

            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 gap-4 text-sm font-medium">
                <li>
                  <a
                    href="#problems"
                    className="hover:text-primary transition-colors"
                  >
                    Problems
                  </a>
                </li>
                <li>
                  <a
                    href="#playlists"
                    className="hover:text-primary transition-colors"
                  >
                    Playlists
                  </a>
                </li>
                <li>
                  <a
                    href="#leaderboard"
                    className="hover:text-primary transition-colors"
                  >
                    Leaderboard
                  </a>
                </li>
              </ul>
            </div>

            <div className="navbar-end">
              <div className="flex items-center gap-4">
                {authUser ? (
                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full opacity-15 blur group-hover:opacity-40 transition duration-300"></div>
                      <div className="relative flex items-center gap-3 bg-base-200 px-4 py-2.5 rounded-full shadow-lg border border-base-300/50 backdrop-blur-sm z-10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-semibold text-sm shadow-md">
                            {authUser.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="hidden sm:block">
                            <span className="text-sm font-medium text-base-content">
                              Welcome back,
                            </span>
                            <div className="text-sm font-semibold text-primary">
                              {authUser.name}
                            </div>
                          </div>
                        </div>
                        <div className="h-6 w-px bg-base-300 hidden sm:block"></div>

                        {/* User Profile Dropdown */}
                        <div className="dropdown dropdown-end">
                          <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar flex flex-row"
                          >
                            <div className="w-8 h-8 rounded-full">
                              <img
                                src={
                                  authUser?.image ||
                                  "https://avatar.iran.liara.run/public/boy"
                                }
                                alt="User Avatar"
                                className="object-cover rounded-full"
                              />
                            </div>
                          </label>
                          <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[9999] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
                          >
                            {/* Common Options */}
                            <li>
                              <p className="text-base font-semibold pointer-events-none">
                                {authUser?.name}
                              </p>
                              <hr className="border-gray-200/10 pointer-events-none" />
                            </li>
                            <li>
                              <Link
                                to="/profile"
                                className="hover:bg-primary hover:text-white text-base font-semibold"
                              >
                                <User className="w-4 h-4 mr-2" />
                                My Profile
                              </Link>
                            </li>
                            {authUser?.role === "ADMIN" && (
                              <li>
                                <Link
                                  to="/add-problem"
                                  className="hover:bg-primary hover:text-white text-base font-semibold"
                                >
                                  <Code className="w-4 h-4 mr-1" />
                                  Add Problem
                                </Link>
                              </li>
                            )}
                            <li>
                              <LogoutButton>
                                <LogOut className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
                                Logout
                              </LogoutButton>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      to="/login"
                      className="relative group btn btn-ghost btn-sm px-6 py-2 rounded-full font-medium hover:bg-base-200/80 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                      <span className="relative">Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="relative group btn btn-primary btn-sm px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full opacity-75 blur group-hover:opacity-100 transition duration-300 -z-10"></div>
                      <span className="relative">Sign Up</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-base-100 border-b border-base-300 shadow-md">
          <ul className="menu p-4 flex flex-col gap-2">
            <li>
              <a
                href="#problems"
                className="py-3 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Problems
              </a>
            </li>
            <li>
              <a
                href="#playlists"
                className="py-3 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Playlists
              </a>
            </li>
            <li>
              <a
                href="#leaderboard"
                className="py-3 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Leaderboard
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
