import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Signup
export const signupUser = async (data) => {
  const response = await API.post("/auth/signup", data);
  return response.data;
};

// Login
export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};