// src/components/Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <header
      style={{
        width: "100%",
        background: "#111114",
        padding: "14px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#a855f7",
              letterSpacing: "1px",
            }}
          >
            EsportsDash
          </div>

          <div style={{ fontSize: "13px", color: "#9ca3af" }}>
            Live Gaming Insights
          </div>
        </div>

        {/* Right Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <input
            type="text"
            placeholder="Search games..."
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid #2d2d31",
              background: "#1f1f23",
              color: "#fff",
              fontSize: "14px",
            }}
          />
          <span style={{ fontSize: "14px", color: "#9ca3af" }}>
            Member 2 – Frontend
          </span>
        </div>
      </div>
    </header>
  );
}
