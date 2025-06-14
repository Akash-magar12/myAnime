import React, { useEffect, useState } from "react";
import { fetchCharactes, fetchSearchCharacter } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setCharacter } from "../reducers/AnimeSlice";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Load from "../components/Load";
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

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll when returning from character page
  },[]);

  if (loading) return <Load value="characters" />;
  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">{error}</div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Banner */}
      <Banner
        text="Explore your favorite anime Characters"
        head="All Anime Characters"
        url={banner}
      />

      {/* Main Content */}
      <div className="mb-4 px-6 md:px-10 lg:px-24 ">
        <Back />
      </div>
      <div className="px-6 md:px-10 lg:px-24 pb-16">
        {/* Back + Search */}

        <div className="mb-10 w-full max-w-3xl mx-auto">
          {/* Search Box */}
          <div className="flex flex-col sm:flex-row items-stretch bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="flex items-center flex-1 px-4 py-2">
              <Search size={18} className="text-gray-400 mr-2 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                type="text"
                placeholder="Search Characters..."
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm sm:text-base"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 text-sm sm:text-base font-medium transition-all duration-200 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* Character Grid */}
        {character?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {character.map((char, index) => (
              <CharacterCard key={index} char={char} index={index} />
            ))}

            {/* Pagination */}
            <div className="col-span-full flex justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`flex items-center text-sm px-3 sm:px-5 py-2 rounded-lg border border-purple-600 
                  ${
                    page === 1
                      ? "bg-gray-800/70 text-gray-500 cursor-not-allowed"
                      : "bg-black/70 text-purple-400 hover:bg-purple-900/70 hover:text-white transition duration-300"
                  }`}
              >
                <ChevronLeft size={18} className="mr-2" />
                Previous
              </button>

              <div className="flex items-center text-sm justify-center px-3 sm:px-4 py-2 bg-purple-900/50 border border-purple-800 rounded-lg text-white">
                Page {page}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center px-5 text-sm py-2 bg-purple-600/90 text-white rounded-lg hover:bg-purple-700 transition duration-300"
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
