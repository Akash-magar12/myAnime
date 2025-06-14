import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Search,
  Menu,
  Cherry,
  X,
  LogOut,
  Home,
  Film,
  Award,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/userSlice";

const Navbar = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && !user) {
      dispatch(setUser(userData));
    }
  }, [user, dispatch]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("user");
      toast.success(response.data.message);
      navigate("/");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchClick = () => {
    navigate("/search");
    setMenuOpen(false); // also close dropdown on mobile
  };

  const handleLinkClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="relative z-20">
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/80 text-white shadow-md z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/home" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="absolute -top-1 -left-1 w-8 h-8 bg-indigo-500/30 rounded-full blur-md animate-pulse" />
                  <Cherry className="h-6 w-6 text-indigo-400 relative z-10 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Anime{" "}
                  <span className="text-indigo-300 group-hover:text-indigo-400">
                    Sanctuary
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/home"
                onClick={handleLinkClick}
                className="flex items-center gap-1 py-2 text-gray-300 hover:text-white relative group"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                to="/genre"
                onClick={handleLinkClick}
                className="flex items-center gap-1 py-2 text-gray-300 hover:text-white relative group"
              >
                <Award className="h-4 w-4" />
                <span>Genre</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Search on Desktop only */}
              <button
                onClick={handleSearchClick}
                className="hidden md:block p-2 bg-gray-900/80 rounded-full border border-gray-700/50 text-gray-300 hover:text-white transition-all duration-200 hover:border-gray-500"
              >
                <Search className="h-4 w-4 cursor-pointer" />
              </button>

              {/* Username on Desktop */}
              <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-gray-700/50 text-sm text-gray-200 rounded-full hover:bg-gray-600 transition">
                <User className="h-4 w-4" />
                <span className="truncate">{user}</span>
              </div>

              {/* Logout button on Desktop */}
              <button
                onClick={handleLogout}
                className="hidden md:flex px-3 py-1.5 rounded-md bg-gray-900/80 border border-gray-600/50 text-white text-sm transition duration-300 relative overflow-hidden group items-center gap-1"
              >
                <span className="relative z-10 flex items-center">
                  <LogOut className="h-4 w-4 mr-1" />
                  <span>Logout</span>
                </span>
                <span className="absolute inset-0 h-full w-0 bg-gray-600 transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Hamburger */}
              <button
                onClick={toggleMenu}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-black/90 border-t border-gray-700/50 shadow-lg">
            <div className="px-2 pt-3 pb-4 space-y-1 sm:px-3">
              <Link
                to="/home"
                onClick={handleLinkClick}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/70"
              >
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </div>
              </Link>
              <Link
                to="/genre"
                onClick={handleLinkClick}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/70"
              >
                <div className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  <span>Genre</span>
                </div>
              </Link>
              <Link
                to="/allAnime"
                onClick={handleLinkClick}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/70"
              >
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>All Anime</span>
                </div>
              </Link>

              {/* Search shown only in mobile */}
              <button
                onClick={handleSearchClick}
                className="w-full text-left px-3 py-2 flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/70 rounded-md"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>

              {/* Logout */}
              <button
                onClick={() => {
                  handleLinkClick();
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/70 rounded-md"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>

              {/* Username in mobile dropdown */}
              {user && (
                <div className="mt-3 px-3 py-2 flex items-center gap-2 bg-gray-700/40 text-sm text-gray-200 rounded-md">
                  <User className="h-4 w-4" />
                  <span className="truncate">{user}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Decorative Border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent"></div>
    </div>
  );
};

export default Navbar;
