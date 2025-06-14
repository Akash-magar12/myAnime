import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import ProtectedRoute from "./components/ProtectedRoutes";
import Search from "./Pages/Search";
import AuthLayout from "./Pages/AuthLayout";
import MainLayout from "./Pages/MainLayout";
import Details from "./Pages/Details";
import GenreDetails from "./Pages/GenreDetails";
import Genre from "./Pages/Genre";
import CharacterDetail from "./Pages/CharacterDetail";
import AllCharacters from "./Pages/AllCharacters";
import AllAnime from "./Pages/AllAnime";
import NotFound from "./components/NotFound";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />, // Handles Login/Signup
    },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/details/:id",
          element: <Details />,
        },
        {
          path: "/character/:id",
          element: <CharacterDetail />,
        },

        {
          path: "/genre",
          element: <Genre />,
        },
        {
          path: "/genre/:id",
          element: <GenreDetails />,
        },
        {
          path: "/allCharacters",
          element: <AllCharacters />,
        },
        { path: "/allAnime", element: <AllAnime /> },
        { path: "/topAiring", element: <AllAnime /> },
        { path: "/upcoming", element: <AllAnime /> },
        { path: "/popular", element: <AllAnime /> },
        { path: "/mostFavorited", element: <AllAnime /> },
        { path: "/movies", element: <AllAnime /> },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
