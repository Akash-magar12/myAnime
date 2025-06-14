import React, { useState } from "react";
import { Cherry, Shield, Mail, Eye, EyeOff, Heart, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { showLogin } from "../reducers/ToggleSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.password !== data.confirmPassword) {
        return toast.error("Password does not match");
      }
      if (!agreedToTerms) {
        return toast.error("You must agree to the terms to continue");
      }
      const response = await axios.post(`${apiUrl}/signup`, data, {
        withCredentials: true,
      });
      if (response) {
        toast.success(response.data.message);
        setData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/home");
        localStorage.setItem("user", JSON.stringify(response.data.user.username));
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/anime-night-sky-illustration_23-2151684333.jpg')",
          filter: "grayscale(100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-lg w-full bg-black/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-500/30 relative z-10">
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/70 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/70 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/70 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/70 rounded-br-xl"></div>

        <div className="text-center mb-4">
          <div className="flex justify-center mb-2 relative">
            <div className="absolute -top-1 -left-1 w-10 h-10 bg-gray-500/20 rounded-full blur-md animate-pulse"></div>
            <Cherry className="h-8 w-8 text-white relative z-10" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Anime{" "}
            <span className="text-indigo-300 group-hover:text-indigo-400">
              Sanctuary
            </span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-300 italic">
            Where otaku dreams come true
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-black/90 p-4 rounded-lg border border-gray-500/30 shadow-md shadow-gray-900/20">
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-white mr-2" />
                  Hero Name
                </div>
              </label>
              <input
                onChange={handleChange}
                value={data.username}
                id="username"
                name="username"
                type="text"
                className="w-full px-3 py-2 text-sm sm:text-base bg-gray-900/80 border border-gray-600/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Your anime persona"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-white mr-2" />
                  Contact Spell
                </div>
              </label>
              <input
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                value={data.email}
                className="w-full px-3 py-2 text-sm sm:text-base bg-gray-900/80 border border-gray-600/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-white mr-2" />
                  Secret Jutsu (Password)
                </div>
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 text-sm sm:text-base bg-gray-900/80 border border-gray-600/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-white mr-2" />
                  Confirm Secret Jutsu
                </div>
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  id="confirmPassword"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-3 py-2 text-sm sm:text-base bg-gray-900/80 border border-gray-600/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center text-xs sm:text-sm text-gray-400">
            <input
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 accent-gray-600 border-gray-700 rounded mr-2"
            />
            <label htmlFor="terms">
              I pledge to follow the Ninja Way and agree to the{" "}
              <a href="#" className="text-gray-300 hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-gray-300 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-gray-900/80 border border-gray-600/50 text-white text-sm sm:text-base font-medium shadow-md shadow-black/50 transition duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Star className="h-4 w-4 mr-2 group-hover:animate-spin" />
                Join the Adventure
              </span>
              <span className="absolute inset-0 h-full w-0 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </form>

        {/* Already have account */}
        <div className="mt-6 text-center text-xs sm:text-sm text-gray-400">
          Already part of our anime world?{" "}
          <button
            onClick={() => dispatch(showLogin())}
            className="cursor-pointer text-gray-300 hover:underline font-medium"
          >
            Sign in now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
