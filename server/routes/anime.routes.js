// routes/anime.routes.js
import express from "express";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import {
  allAnime,
  topAiring,
  upcoming,
  favourite,
  popularity,
  character,
  searchAnime,
  animeDetails,
  characterDetails,
  getGenres,
  searchByGenre,
  getRandom,
  movie,
  anmieCharacter,
  getRecommendations,
  searchCharacter,
} from "../controllers/anime.controller.js";

const animeRouter = express.Router();

//! 🧾 All Anime
animeRouter.get("/all", protectedRoutes, allAnime); //* done
//! manga

//! 📺 Top Anime Categories
animeRouter.get("/top_airing", protectedRoutes, topAiring); //* done
animeRouter.get("/movie", protectedRoutes, movie); //* done
animeRouter.get("/upcoming", protectedRoutes, upcoming); //* done
animeRouter.get("/favorite", protectedRoutes, favourite); //* done
animeRouter.get("/popular", protectedRoutes, popularity); //* done

// !random
animeRouter.get("/random", protectedRoutes, getRandom); //* done

//! 👤 Characters
animeRouter.get("/character", protectedRoutes, character); //* done
animeRouter.get("/animeCharacter/:id", protectedRoutes, anmieCharacter); //* done
animeRouter.get("/searchCharacter/:query", protectedRoutes, searchCharacter); //* done

//! 🔍 Search
animeRouter.get("/searchAnime/:query", protectedRoutes, searchAnime); //* done
//! details
animeRouter.get("/details/:id", protectedRoutes, animeDetails); //* done
animeRouter.get("/character/:id", protectedRoutes, characterDetails); //* done

//! genre
animeRouter.get("/genres", protectedRoutes, getGenres); //* done
animeRouter.get("/searchByGenre/:id", protectedRoutes, searchByGenre); //* done
animeRouter.get("/recommendations/:id", protectedRoutes, getRecommendations); //* done

export default animeRouter;
