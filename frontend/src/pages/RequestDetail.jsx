import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { fetchRequestById, updateRequestStatus } from "../api/requestApi";

const RequestDetail = () => {

  const { id } = useParams();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRequest = async () => {
    try {

      setLoading(true);

      const data = await fetchRequestById(id);

      setRequest(data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Failed to load request"
      );

    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {

    const status = e.target.value;

    try {

      const updated = await updateRequestStatus(id, status);

      setRequest(updated);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Failed to update status"
      );
    }
  };

  useEffect(() => {
    loadRequest();
  }, [id]);

  if (loading) {
    return <p>Loading request...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!request) {
    return <p>Request not found</p>;
  }

  return (
    <div>

      <Navbar />

      <div className="container dashboard">

        <h2>{request.title}</h2>

        <p style={{ marginTop: "10px" }}>
          {request.description}
        </p>

        <p style={{ marginTop: "10px" }}>
          <strong>Category:</strong> {request.category}
        </p>

        <p>
          <strong>Priority:</strong> {request.priority}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {new Date(request.createdAt).toLocaleString()}
        </p>

        <div style={{ marginTop: "20px" }}>

          <label>Status</label>

          <select
            value={request.status}
            onChange={handleStatusChange}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>

        </div>

      </div>

    </div>
  );
};

export default RequestDetail;