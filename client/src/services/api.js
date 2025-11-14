// client/src/services/api.js
import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
});

export default api;