/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovie } from "../reducers/AnimeSlice";
import { useNavigate } from "react-router-dom";
import { fetchMoive } from "../utils/api";
import Load from "./Load";
import { Star } from "lucide-react";

const Movie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movie } = useSelector((store) => store.anime);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchMoive();
      dispatch(setMovie(result));
    } catch (err) {
      console.error("Movie fetch error:", err.message);
      setError("Failed to load movie list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );
  }

  return (
    <div className=" relative flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Header */}
      <div className="relative z-10 w-full max-w-8xl mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">Top Anime Movies</h2>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl w-full relative z-10">
        {loading ? (
          <Load value="movies" />
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
            {movie?.length > 0 ? (
              movie.map((item, index) => (
                <div
                  key={`${item.mal_id}-${index}`}
                  className="group relative cursor-pointer rounded-lg overflow-hidden flex-shrink-0 w-60"
                  onClick={() => navigate(`/anime/${item.mal_id}`)}
                >
                  {/* Poster Image */}
                  <div className="h-[400px] w-full overflow-hidden">
                    <img
                      src={
                        item.images?.webp?.large_image_url ||
                        item.images?.webp?.image_url ||
                        "/api/placeholder/300/450"
                      }
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Title Always Visible */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-2 px-3">
                    <h3 className="text-white font-medium text-sm truncate">
                      {item.title}
                    </h3>
                  </div>

                  {/* Details on Hover */}
                  <div className="absolute inset-0 bg-black/80 flex flex-col h-full justify-center px-4 py-3 opacity-0 group-hover:opacity-100 transition duration-300">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.score && (
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full flex items-center gap-1">
                          <Star size={12} />
                          {item.score}
                        </span>
                      )}
                      {item.type && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                          {item.type}
                        </span>
                      )}
                      {item.year && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                          {item.year}
                        </span>
                      )}
                    </div>

                    {item.synopsis && (
                      <p className="text-gray-300 text-xs mb-3 line-clamp-6">
                        {item.synopsis}
                      </p>
                    )}

                    {item.genres && item.genres.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {item.genres.slice(0, 3).map((genre) => (
                          <span
                            key={genre.mal_id}
                            className="text-xs text-gray-300"
                          >
                            {genre.name}
                            {item.genres.indexOf(genre) <
                            Math.min(2, item.genres.length - 1)
                              ? ","
                              : ""}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-10">
                <p className="text-gray-200">
                  No movies found. Try again later.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
