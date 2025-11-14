// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    style={({ isActive }) => ({
      display: "block",
      padding: "10px 14px",
      borderRadius: 8,
      color: isActive ? "#fff" : "#374151",
      background: isActive ? "#4f46e5" : "transparent",
      textDecoration: "none",
      marginBottom: 6,
    })}
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside style={{ width: 260, background: "#fff", borderRight: "1px solid #e5e7eb", padding: 16, minHeight: "calc(100vh - 64px)" }}>
      <div style={{ marginBottom: 12, color: "#6b7280", fontSize: 12 }}>Navigation</div>
      <nav>
        <NavItem to="/">Dashboard</NavItem>
        <NavItem to="/games">Games</NavItem>
        <NavItem to="/analytics">Analytics</NavItem>
        <NavItem to="/settings">Settings</NavItem>
      </nav>
    </aside>
  );
}
