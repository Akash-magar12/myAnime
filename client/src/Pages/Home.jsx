import React from "react";
import Hero from "../components/Hero";
import TopAnime from "../components/TopAnime";
import Characters from "../components/Characters";

const Home = () => {
  return (
    <div className="w-full min-h-screen  ">
      <Hero />
      <TopAnime />
      <Characters />
    </div>
  );
};

export default Home;
