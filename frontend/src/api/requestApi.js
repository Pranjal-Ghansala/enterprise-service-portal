import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Get all requests
export const fetchRequests = async (filters = {}) => {

  const params = new URLSearchParams(filters).toString();

  const response = await API.get(`/requests?${params}`);

  return response.data;
};


// Create request
export const createRequest = async (data) => {
  const response = await API.post("/requests", data);
  return response.data;
};


// Get single request
export const fetchRequestById = async (id) => {
  const response = await API.get(`/requests/${id}`);
  return response.data;
};


// Update request status
export const updateRequestStatus = async (id, status) => {

  const response = await API.patch(`/requests/${id}`, { status });

  return response.data;
};