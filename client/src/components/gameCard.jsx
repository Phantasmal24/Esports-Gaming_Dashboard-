// src/components/GameCard.jsx
import React from "react";

export default function GameCard({ game, onView, onToggleCompare }) {
  return (
    <article style={{ background: "#fafafa", borderRadius: 10, padding: 12, display: "flex", flexDirection: "column", gap: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <div style={{ height: 140, borderRadius: 8, overflow: "hidden" }}>
        <img
          src={game.image}
          alt={game.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => (e.target.src = "https://via.placeholder.com/400x200?text=Game")}
        />
      </div>

      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, fontSize: 16 }}>{game.name}</h4>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Released: {game.released}</div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <div>
            <div style={{ fontSize: 13 }}>Rating <strong>{game.rating}</strong></div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Players {game.players.toLocaleString()}</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700 }}>{game.metacritic}</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Metacritic</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onView?.(game)} style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff" }}>
          View
        </button>
        <button onClick={() => onToggleCompare?.(game)} style={{ flex: 1, padding: "8px 10px", borderRadius: 8, background: "#4f46e5", color: "#fff", border: "none" }}>
          Compare
        </button>
      </div>
    </article>
  );
}
