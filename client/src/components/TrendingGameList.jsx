// src/components/TrendingGamesList.jsx
import React, { useState } from "react";
import mock from "../mock-data";
import GameCard from "./GameCard";

export default function TrendingGamesList() {
  const [compareIds, setCompareIds] = useState([]);

  const toggleCompare = (game) => {
    setCompareIds((prev) =>
      prev.includes(game.id) ? prev.filter((id) => id !== game.id) : [...prev.slice(0, 1), game.id] // keep max 2
    );
  };

  const handleView = (game) => {
    // for now, simple alert or you can navigate to /game/:slug
    alert(`View ${game.name} (you can replace this with route navigation)`);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
      {mock.trending.map((g) => (
        <GameCard key={g.id} game={g} onView={handleView} onToggleCompare={toggleCompare} />
      ))}
    </div>
  );
}
