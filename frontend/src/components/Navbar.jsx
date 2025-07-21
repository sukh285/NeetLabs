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
      <nav className="navbar font-inter fixed top-0 left-0 z-50 bg-gradient-to-r from-neet-neutral/80 via-neet-neutral to-neet-neutral/80 border-b border-neet-primary/20 px-4 lg:px-8 shadow-lg w-full max-w-full py-3 backdrop-blur-sm">
        <div className="navbar-start w-full">
          <div className="flex items-center justify-between w-full lg:grid lg:grid-cols-3 lg:gap-4 font-inter">
            {/* Left section - Logo */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-neet-base-100/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-neet-base-100/20 transition-all duration-300 shadow-lg border border-neet-base-100/20">
                  <Code className="w-6 h-6 text-neet-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-2xl leading-none font-limelight font-bold text-neet-base hidden sm:block">
                  NeetLabs
                </span>
              </Link>
            </div>

            {/* Center section - Navigation Links */}
            <div className="hidden lg:flex justify-center">
              <ul className="menu menu-horizontal px-1 gap-6 text-sm font-medium">
                <li>
                  <Link to={"/problems"}>
                    <span className="text-neet-accent/80 hover:text-neet-primary transition-colors duration-300">
                      Problems
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/playlists"}
                    className="text-neet-accent/80 hover:text-neet-primary transition-colors duration-300"
                  >
                    Playlists
                  </Link>
                </li>
                <li>
                  <a
                    href="#leaderboard"
                    className="text-neet-accent/80 hover:text-neet-primary transition-colors duration-300"
                  >
                    Leaderboard
                  </a>
                </li>
              </ul>
            </div>

            {/* Right section - User actions */}
            <div className="flex items-center justify-end gap-4">
              {authUser ? (
                <div className="flex items-center gap-2">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-neet-primary to-neet-accent rounded-full opacity-20 blur group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative flex items-center gap-2 bg-neet-base-100/10 backdrop-blur-xl px-8 py-1.5 rounded-full shadow-lg border border-neet-base-100/20 z-10 group-hover:bg-neet-primary/20 transition-colors duration-300 min-w-[220px]">
                      {/* Only show name on md+ screens, smaller font */}
                      <div className="leading-none hidden sm:block pl-1 flex-1 min-w-0">
                        <span className="text-xs font-medium text-neet-accent/80">
                          Welcome Back,
                        </span>
                        <div className="text-xs font-semibold text-neet-base-100 truncate max-w-[120px]">
                          {authUser.name}
                        </div>
                      </div>
                      <div className="h-5 w-px bg-neet-base-100/20 hidden sm:block"></div>

                      {/* User Profile Dropdown */}
                      <div className="dropdown dropdown-end">
                        <label
                          tabIndex={0}
                          className="btn btn-ghost btn-circle avatar flex flex-row p-0 hover:bg-neet-primary/20 transition-colors duration-300"
                        >
                          <div className="w-7 h-7 rounded-full">
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
                          className="menu menu-sm dropdown-content mt-3 z-[9999] p-2 shadow-xl bg-neet-neutral/90 backdrop-blur-xl rounded-2xl w-44 space-y-2 border border-neet-base-100/20"
                        >
                          {/* Common Options */}
                          <li>
                            <p className="text-sm font-semibold text-neet-base-100 pointer-events-none">
                              {authUser?.name}
                            </p>
                            <hr className="border-neet-base-100/20 pointer-events-none" />
                          </li>
                          <li>
                            <Link
                              to="/profile"
                              className="hover:bg-neet-primary/20 hover:text-neet-primary text-sm font-semibold text-neet-accent rounded-xl transition-colors duration-200"
                            >
                              <User className="w-4 h-4 mr-2" />
                              My Profile
                            </Link>
                          </li>
                          {authUser?.role === "ADMIN" && (
                            <li>
                              <Link
                                to="/add-problem"
                                className="hover:bg-neet-primary/20 hover:text-neet-primary text-sm font-semibold text-neet-accent rounded-xl transition-colors duration-200"
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
                  {/* Login Button */}
                  <Link
                    to="/login"
                    className="btn btn-sm px-4 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 bg-neet-base-100/10 backdrop-blur-sm border border-neet-base-100/20 text-neet-accent hover:bg-neet-primary/20 hover:text-neet-primary"
                  >
                    Login
                  </Link>

                  {/* Signup Button */}
                  <Link
                    to="/signup"
                    className="relative group btn btn-sm px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden bg-gradient-to-r from-neet-primary to-neet-secondary hover:from-neet-secondary hover:to-neet-accent text-neet-primary-content border-none"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-neet-secondary to-neet-accent rounded-full opacity-75 blur group-hover:opacity-100 transition duration-300 -z-10"></div>
                    <span className="relative">Start for free</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from being hidden under the fixed navbar */}
      <div className="h-[68px] w-full"></div>
    </>
  );
};

export default Navbar;
