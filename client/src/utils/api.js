// utils/api.js
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const BASE_URL = `${apiUrl}/anime`;
// const BASE_URL = `${import.meta.env.VITE_API_URL}/anime`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // This applies to all requests made using this instance
});
// ! random anime
export const fetchRandomAnime = async () => {
  try {
    const response = await api.get("/random"); // For fetching a random anime
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchRandomAnime error:", error.message);
  }
};
// ! All Anime
export const fetchAllAnime = async (page = 1) => {
  try {
    const response = await api.get(`/all?page=${page}`); // Add page to the API request
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchAllAnime error:", error.message);
  }
};

// ! Top Airing
export const fetchTopAiring = async (page = 1) => {
  try {
    const response = await api.get(`/top_airing?page=${page}`); // Add page to the API request
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchTopAiring error:", error.message);
  }
};

// ! Upcoming Anime
export const fetchUpcoming = async (page = 1) => {
  try {
    const response = await api.get(`/upcoming?page=${page}`); // Add page to the API request
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchUpcoming error:", error.message);
  }
};

// ! Popular Anime
export const fetchPopular = async (page = 1) => {
  try {
    const response = await api.get(`/popular?page=${page}`); // Add page to the API request
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchPopular error:", error.message);
  }
};

// ! Favorite Anime
export const fetchFavorited = async (page = 1) => {
  try {
    const response = await api.get(`/favorite?page=${page}`); // Add page to the API request
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchFavorited error:", error.message);
  }
};

// ! Movies
export const fetchMoive = async (page = 1) => {
  try {
    const response = await api.get(`/movie?page=${page}`); // Add page to the API request
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchMovies error:", error.message);
  }
};

// ! characters

export const fetchCharactes = async (page = 1) => {
  try {
    const response = await api.get(`/character?page=${page}`); // For fetching characters
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchCharacters error:", error.message);
  }
};

// ! genre

export const fetchGenre = async () => {
  try {
    const response = await api.get("/genres"); // For fetching genres
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchGenres error:", error.message);
  }
};

// ! search anime

export const fetchSearchAnime = async (query) => {
  try {
    const response = await api.get(`/searchAnime/${query}`); // For searching anime
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchSearchAnime error:", error.message);
  }
};

// ! seacrchCharacter

export const fetchSearchCharacter = async (query) => {
  try {
    const response = await api.get(`/searchCharacter/${query}`);
    console.log("fetchSearchCharacter API response:", response.data); // ADD THIS
    return response.data; // not response.data.data
  } catch (error) {
    console.error("fetchSearchCharacter error:", error.message);
    return [];
  }
};

// ! detail anime

export const fetchDetailed = async (id) => {
  try {
    const response = await api.get(`/details/${id}`); // For fetching detailed anime information
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchDetailed error:", error.message);
  }
};

// !  anime character

export const fetchAnimeCharacters = async (id) => {
  try {
    const response = await api.get(`/animeCharacter/${id}`); // For fetching anime characters
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchAnimeCharacters error:", error.message);
  }
};

// ! recoomendation anime

export const fetchRecommendations = async (id) => {
  try {
    const response = await api.get(`/recommendations/${id}`); // For fetching recommendations
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchRecommendations error:", error.message);
  }
};

//! genre details
export const fetchGenreDetails = async (id) => {
  try {
    const response = await api.get(`/searchByGenre/${id}`); // For fetching genre details
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetchGenreDetails error:", error.message);
  }
};

//! character detail

export const fetchCharacterDetails = async (id) => {
  try {
    const response = await api.get(`/character/${id}`); // For fetching genre details
    return response.data.data; // Assuming your backend sends { data: animeObject }
  } catch (error) {
    console.error("fetch character Details error:", error.message);
  }
};
