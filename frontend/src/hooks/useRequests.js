import { useState, useEffect } from "react";
import { fetchRequests, createRequest, updateRequestStatus } from "../api/requestApi";

const useRequests = (filters) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1
  });

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchRequests(filters);
      setRequests(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const addRequest = async (payload) => {
    try {
      // Frontend validation before sending
      if (!payload.title || !payload.description || !payload.category) {
        return { success: false, message: "Title, description, and category are required" };
      }

      // Set default priority if missing
      if (!payload.priority) payload.priority = "Low";

      // Send request
      const newRequest = await createRequest(payload);

      setRequests((prev) => [newRequest, ...prev]);

      return { success: true, data: newRequest };
    } catch (err) {
      // Handle backend validation errors from express-validator
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.map(e => e.msg).join(", ") ||
        "Request creation failed";

      return { success: false, message: backendMessage };
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const updated = await updateRequestStatus(id, status);

      setRequests((prev) =>
        prev.map((req) => (req._id === id ? updated : req))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update request");
    }
  };

  useEffect(() => {
    loadRequests();
  }, [JSON.stringify(filters)]);

  return {
    requests,
    loading,
    error,
    pagination,
    addRequest,
    updateStatus,
    reload: loadRequests
  };
};

export default useRequests;