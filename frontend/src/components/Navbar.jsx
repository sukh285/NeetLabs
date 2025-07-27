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
      <nav className="navbar font-inter fixed top-0 left-0 z-99 bg-neet-neutral border-b border-neet-primary/20 px-4 lg:px-8 shadow-lg w-full py-2 backdrop-blur-sm">
        <div className="navbar-start py-2 w-full">
          <div className="flex items-center justify-between w-full lg:grid lg:grid-cols-3 lg:gap-4 font-inter">
            {/* Left - Logo */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden text-neet-base-100"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link to="/" className="flex items-center gap-2 group">
                <img
                  src="/logo2.png"
                  alt="NeetLabs Logo"
                  className="w-10 h-10 rounded-xl bg-neet-base-100 object-contain"
                />
                <span className="text-2xl leading-none font-limelight font-bold text-neet-base hidden sm:block">
                  NeetLabs
                </span>
              </Link>
            </div>

            {/* Center - Links (Desktop) */}
            <div className="hidden lg:flex justify-center">
              <ul className="flex items-center gap-6 text-xs font-medium h-10">
                {[
                  "problems",
                  "playlists",
                  "resources",
                  "pricing",
                  "feedback",
                ].map((route) => (
                  <li key={route} className="h-10 flex items-center">
                    <Link
                      to={`/${route}`}
                      className="text-neet-accent/80 hover:text-neet-primary px-3 py-1 transition-colors duration-300"
                    >
                      {route.charAt(0).toUpperCase() + route.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - User Actions */}
            <div className="flex items-center justify-end gap-3">
              {authUser ? (
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-neet-primary to-neet-accent rounded-full opacity-20 blur group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative flex items-center gap-2 bg-neet-base-100/10 backdrop-blur-xl px-5 py-1 rounded-full shadow-lg border border-neet-base-100/20 z-10 group-hover:bg-neet-primary/20 transition-colors duration-300 min-w-[160px]">
                    <div className="leading-none hidden sm:block pl-1 flex-1 min-w-0">
                      <span className="text-xs font-medium text-neet-accent/80">
                        Dashboard
                      </span>
                      <div className="text-xs font-semibold text-neet-base-100 truncate max-w-[90px]">
                        {authUser.name}
                      </div>
                    </div>
                    <div className="h-4 w-px bg-neet-base-100/20 hidden sm:block" />

                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar flex p-0 hover:bg-neet-primary/20 transition-colors duration-300"
                      >
                        <div className="w-6 h-6 rounded-full">
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
                        className="menu menu-sm dropdown-content mt-3 z-[9999] p-2 shadow-xl bg-neet-neutral/90 backdrop-blur-xl rounded-2xl w-40 space-y-2 border border-neet-base-100/20"
                      >
                        <li>
                          <p className="text-xs font-semibold text-neet-base-100 pointer-events-none">
                            {authUser?.name}
                          </p>
                          <hr className="border-neet-base-100/20" />
                        </li>
                        <li>
                          <Link
                            to="/profile"
                            className="hover:bg-neet-primary/20 text-xs font-semibold text-neet-accent rounded-xl transition-colors duration-200"
                          >
                            <User className="w-4 h-4 mr-2" />
                            My Profile
                          </Link>
                        </li>
                        {authUser?.role === "ADMIN" && (
                          <li>
                            <Link
                              to="/add-problem"
                              className="hover:bg-neet-primary/20 text-xs font-semibold text-neet-accent rounded-xl transition-colors duration-200"
                            >
                              <Code className="w-4 h-4 mr-1" />
                              Add Problem
                            </Link>
                          </li>
                        )}
                        <li>
                          <LogoutButton>
                            <LogOut className="w-4 h-4" />
                            Logout
                          </LogoutButton>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="btn btn-sm px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 bg-neet-base-100/10 border border-neet-base-100/20 text-neet-accent hover:bg-neet-primary/20 hover:text-neet-primary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="relative group btn btn-sm px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden bg-gradient-to-r from-neet-primary to-neet-secondary hover:from-neet-secondary hover:to-neet-accent text-neet-primary-content border-none"
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

      {/* Sidebar for Small Screens */}
      <div
        className={`fixed top-0 left-0 z-[999] h-full w-64 bg-neet-neutral transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden shadow-xl`}
      >
        <div className="flex items-center justify-between p-4 border-b border-neet-base-100/10">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <img src="/logo2.png" alt="Logo" className="w-8 h-8 rounded-md" />
            <span className="text-lg font-limelight text-neet-base">
              NeetLabs
            </span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-neet-base-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4 text-sm font-medium">
          {["problems", "playlists", "resources", "pricing", "feedback"].map(
            (route) => (
              <li key={route}>
                <Link
                  to={`/${route}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-neet-accent hover:text-neet-primary transition-colors duration-200"
                >
                  {route.charAt(0).toUpperCase() + route.slice(1)}
                </Link>
              </li>
            )
          )}
          {authUser ? (
            <>
              <li>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-neet-accent hover:text-neet-primary"
                >
                  <User className="inline w-4 h-4 mr-2" />
                  Profile
                </Link>
              </li>
              {authUser.role === "ADMIN" && (
                <li>
                  <Link
                    to="/add-problem"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-neet-accent hover:text-neet-primary"
                  >
                    <Code className="inline w-4 h-4 mr-2" />
                    Add Problem
                  </Link>
                </li>
              )}
              <li>
                <LogoutButton>
                  <LogOut className="inline w-4 h-4 mr-2" />
                  Logout
                </LogoutButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-neet-accent hover:text-neet-primary"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-neet-accent hover:text-neet-primary"
                >
                  Start for Free
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Spacer to offset fixed navbar */}
      <div className="h-[65px] w-full"></div>
    </>
  );
};

export default Navbar;
