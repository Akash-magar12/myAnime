import axios from "axios";

//! All Anime
export const allAnime = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?page=${page}`
    );
    res.status(200).json({
      message: "Data fetched successfully",
      data: response.data.data,
      pagination: response.data.pagination, // Optional: sending pagination info too
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching anime" });
  }
};

//! Top Airing
export const topAiring = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/top/anime?filter=airing&page=${page}`
    );
    res.status(200).json({
      message: "Data fetched successfully",
      data: response.data.data,
      pagination: response.data.pagination,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching top airing anime" });
  }
};

//! Movies
export const movie = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/top/anime?type=movie&page=${page}`
    );
    res.status(200).json({
      message: "Data fetched successfully",
      data: response.data.data,
      pagination: response.data.pagination,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching movies" });
  }
};

//! Upcoming Anime
export const upcoming = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/top/anime?filter=upcoming&page=${page}`
    );
    res.status(200).json({
      message: "Data fetched successfully",
      data: response.data.data,
      pagination: response.data.pagination,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching upcoming anime" });
  }
};

//! Most Favorited
export const favourite = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/top/anime?filter=favorite&page=${page}`
    );
    res.status(200).json({
      message: "Data fetched successfully",
      data: response.data.data,
      pagination: response.data.pagination,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching favorited anime" });
  }
};

//! Most Popular
export const popularity = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${page}`
    );
    res.status(200).json({
      message: "Data fetched successfully",
      data: response.data.data,
      pagination: response.data.pagination,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching popular anime" });
  }
};

//! Top Characters

export const character = async (req, res) => {
  try {
    const page = req.query.page || 1; // fallback to page 1 if not provided

    const response = await axios.get(
      `https://api.jikan.moe/v4/top/characters?page=${page}`
    );

    res.status(200).json({
      message: "Data fetched successfully",
      data: response.data.data,
      pagination: response.data.pagination, // optional: helpful for frontend
    });
  } catch (error) {
    console.log("Character fetch error:", error.message);
    res.status(500).json({
      message: "Failed to fetch character data",
      error: error.message,
    });
  }
};

//! anime Characters

export const anmieCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}/characters`
    );
    res.status(200).json({
      message: "data fetched successfully",
      data: response.data.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//! Anime Search
export const searchAnime = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${query}`
    );
    res.status(200).json({
      message: "data fetched successfully",
      data: response.data.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
//! anime detail

export const animeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
    res
      .status(200)
      .json({ message: "Anime details fetched", data: response.data.data });
  } catch (error) {
    console.log(error.message);
  }
};
//! character detail

export const characterDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://api.jikan.moe/v4/characters/${id}`
    );
    res
      .status(200)
      .json({ message: "Character details fetched", data: response.data.data });
  } catch (error) {
    console.log(error.message);
  }
};

//! get genre

export const getGenres = async (req, res) => {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/genres/anime");
    res.status(200).json({
      message: "Genres fetched successfully",
      data: response.data.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//! get genre detail
export const searchByGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?genres=${id}`
    );
    res.status(200).json({
      message: "Anime by genre fetched successfully",
      data: response.data.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getRandom = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=25"
    );

    const animeList = response.data?.data;

    if (!animeList || animeList.length === 0) {
      return res.status(404).json({ message: "No anime found" });
    }

    const randomIndex = Math.floor(Math.random() * animeList.length);
    const randomAnime = animeList[randomIndex];

    res.status(200).json({
      message: "Random anime fetched successfully",
      data: randomAnime,
    });
  } catch (error) {
    console.error("Random Anime Error:", error.message);
    res.status(500).json({
      message: "Failed to fetch random anime",
      error: error.message,
    });
  }
};

//! get recommendations
export const getRecommendations = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}/recommendations`,
      {
        params: {
          limit: 25,
        },
      }
    );
    res.status(200).json({
      message: "Anime by genre fetched successfully",
      data: response.data.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const searchCharacter = async (req, res) => {
  const { query } = req.params;

  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/characters?q=${query}&limit=20`
    );
    res.status(200).json(response.data.data);
  } catch (error) {
    console.error("Error searching character:", error.message);
    res.status(500).json({ message: "Failed to search character." });
  }
};
