import React, { useEffect, useState } from "react";
import { fetchCharactes, fetchSearchCharacter } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCharacter } from "../reducers/AnimeSlice";
import Load from "../components/Load";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Back from "../components/Back";
import Banner from "../components/Banner";
import banner from "../assets/banner1.webp";
import CharacterCard from "../components/CharacterCard";

const AllCharacters = () => {
  const dispatch = useDispatch();
  const { character } = useSelector((store) => store.anime);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const characterFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCharactes(page);
      dispatch(setCharacter(result));
    } catch (err) {
      console.error("Character fetch error:", err.message);
      setError("Failed to load character list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetchSearchCharacter(query);
      dispatch(setCharacter(response));
      setQuery("");
    } catch (err) {
      console.error("Search error:", err.message);
      setError("Failed to search character.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    characterFetch();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (loading) return <Load value="characters" />;
  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">{error}</div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Banner Background - Similar to the screenshot */}
      <Banner
        text="Explore your favorite anime Characters "
        head="All Anime Characters"
        url={banner}
      />

      {/* Main content */}
      <div className="px-6 md:px-10 lg:px-24 pb-16">
        <div className="relative mb-10">
          <Back />
          <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="pl-4 text-gray-400">
              <Search size={18} />
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              type="text"
              placeholder="Search Characters..."
              className="flex-grow py-2 px-2 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
            />
            <button
              onClick={handleSearch}
              className="bg-gray-800 cursor-pointer hover:bg-gray-700 text-white px-4 py-2 text-sm font-medium transition-all duration-200"
            >
              Search
            </button>
          </div>
        </div>
        {character?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {character.map((char, index) => (
              <CharacterCard char={char} index={index} />
            ))}

            {/* Navigation Buttons */}
            <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 flex justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`flex items-center px-5 py-2 rounded-lg border border-purple-600 
                  ${
                    page === 1
                      ? "bg-gray-800/70 text-gray-500 cursor-not-allowed"
                      : "bg-black/70 text-purple-400 hover:bg-purple-900/70 hover:text-white transition duration-300"
                  }`}
              >
                <ChevronLeft size={18} className="mr-2" />
                Previous
              </button>
              <div className="flex items-center justify-center px-4 py-2 bg-purple-900/50 border border-purple-800 rounded-lg text-white">
                Page {page}
              </div>
              <button
                onClick={handleNext}
                className="flex items-center px-5 py-2 bg-purple-600/90 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Next
                <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-white text-center py-10 bg-black/50 backdrop-blur-sm rounded-lg">
            No characters found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllCharacters;
