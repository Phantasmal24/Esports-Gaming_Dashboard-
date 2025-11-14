// client/src/services/transformers.js

// Accepts various shapes and returns [{label, value}, ...]
export function toLabelValueList(raw) {
  if (!raw) return null;

  // If it's already in label/value format
  if (Array.isArray(raw) && raw.length && raw[0].label !== undefined && raw[0].value !== undefined) {
    return raw;
  }

  // RAWG genres shape: [{ name, games_count, ... }]
  if (Array.isArray(raw) && raw.length && raw[0].name && raw[0].games_count !== undefined) {
    return raw.map((g) => ({ label: g.name, value: g.games_count }));
  }

  // RAWG platforms shape: [{ name, games_count, ... }]
  if (Array.isArray(raw) && raw.length && raw[0].name && raw[0].games_count === undefined && raw[0].platforms !== undefined) {
    // sometimes nested; fallback: use name + games_count if exists
    return raw.map((p) => ({ label: p.name, value: p.games_count || (p.games ? p.games.length : 1) }));
  }

  // RAWG games list: [{ name, ratings_count or rating, ...}]
  if (Array.isArray(raw) && raw.length && raw[0].name) {
    return raw.map((g) => ({
      label: g.name,
      value: g.ratings_count ?? g.released ? 1 : 1, // use ratings_count if available, otherwise fallback
    }));
  }

  // Generic fallback: map keys -> counts
  if (Array.isArray(raw)) {
    return raw.map((x, i) => ({ label: x.name || `Item ${i+1}`, value: x.count ?? x.value ?? 1 }));
  }

  return null;
}