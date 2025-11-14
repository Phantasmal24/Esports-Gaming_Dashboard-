// client/src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toLabelValueList } from "../services/transformers";

import GenrePieChart from "../components/GenrePieChart";
import PlatformBarChart from "../components/PlatformBarChart";
import RatingsBarChart from "../components/RatingsBarChart";

import "../chartSetup";

function DashboardPage() {
  const [genres, setGenres] = useState(null);
  const [platforms, setPlatforms] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [trending, setTrending] = useState(null);

  const [loading, setLoading] = useState({
    genres: false,
    platforms: false,
    trending: false,
    ratings: false,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadAll() {
      setError(null);
      setLoading({ genres: true, platforms: true, trending: true, ratings: true });

      try {
        // Use your backend endpoints. If your backend mounts routes at /genres etc.
        // ensure services/api.js baseURL is set (REACT_APP_API_URL).
        const [gRes, pRes, tRes] = await Promise.all([
          api.get("/api/genres"),
          api.get("/api/platforms"),
          api.get("/api/trending"),
        ]);

        if (!mounted) return;

        // transform data into simple label/value arrays for charts
        setGenres(toLabelValueList(gRes.data || []));
        setPlatforms(toLabelValueList(pRes.data || []));
        setTrending(tRes.data || []);

        // Build ratings list from trending (fallback to metacritic or 0)
        const ratingsList =
          (tRes.data &&
            toLabelValueList(
              tRes.data.map((game) => ({
                label: game.name,
                value: game.rating ?? game.metacritic ?? game.ratings_count ?? 0,
              }))
            )) ||
          null;
        setRatings(ratingsList);

        // mark loaded
        setLoading({ genres: false, platforms: false, trending: false, ratings: false });
      } catch (err) {
        console.error("Load error:", err);
        if (!mounted) return;
        setError("Unable to fetch data from backend. Make sure the server is running.");
        // turn off loaders individually (you could also keep partial data visible)
        setLoading({ genres: false, platforms: false, trending: false, ratings: false });
      }
    }

    loadAll();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>Esports & Gaming Stats Dashboard</h1>

      {error && (
        <div style={{ color: "red", marginTop: 12 }}>
          {error}
        </div>
      )}

      <section style={{ marginTop: 24 }}>
        <h2>Trending Games</h2>

        {loading.trending && <p>Loading trending games...</p>}

        {!loading.trending && !trending && <p>No trending games found.</p>}

        {!loading.trending && trending && (
          <ul>
            {trending.slice(0, 10).map((game) => (
              <li key={game.id || game.slug || game.name}>{game.name}</li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Genre Trends</h2>

        {loading.genres && <p>Loading genres...</p>}

        {!loading.genres && !genres && <p>No genre data available.</p>}

        {!loading.genres && genres && <GenrePieChart data={genres} />}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Platform Popularity</h2>

        {loading.platforms && <p>Loading platforms...</p>}

        {!loading.platforms && !platforms && <p>No platform data available.</p>}

        {!loading.platforms && platforms && <PlatformBarChart data={platforms} />}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Ratings</h2>

        {loading.ratings && <p>Loading ratings...</p>}

        {!loading.ratings && !ratings && <p>No ratings data available.</p>}

        {!loading.ratings && ratings && <RatingsBarChart data={ratings} />}
      </section>
    </div>
  );
}

export default DashboardPage;
