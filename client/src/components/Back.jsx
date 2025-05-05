import React from "react";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-6 text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition"
    >
      ← Back
    </button>
  );
};

export default Back;
