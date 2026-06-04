import axios from "axios";

const API_BASE_URL =
  process.env.API_BASE_URL || "http://192.168.29.170:5005/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
