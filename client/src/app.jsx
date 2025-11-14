// client/src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { setupCharts } from "./chartSetup"; // registers Chart.js elements once
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";

// Optional placeholder pages
const GamesPage = () => <div style={{ padding: 24 }}>Games page (placeholder)</div>;
const GameDetailPage = ({}) => <div style={{ padding: 24 }}>Game Detail (placeholder)</div>;
const AnalyticsPage = () => <div style={{ padding: 24 }}>Analytics (placeholder)</div>;
const SettingsPage = () => <div style={{ padding: 24 }}>Settings (placeholder)</div>;

// Register chart elements once
setupCharts();

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
      <Navbar />

      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Sidebar: hidden on small screens inside its own component */}
        <Sidebar />

        {/* Main content area */}
        <main
          style={{
            flex: 1,
            padding: 24,
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/game/:slug" element={<GameDetailPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Fallback route: redirect to dashboard (optional) */}
            <Route path="*" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
