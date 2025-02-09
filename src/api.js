import axios from "axios";

// Set up the backend API base URL
const API = axios.create({
  baseURL: "http://localhost:5001/api", // Backend URL
});

export default API