import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const RequestCard = ({ request, updateStatus }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState(request.status);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateStatus(request._id, status);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const priorityColors = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700"
  };

  const statusColors = {
    Open: "bg-blue-100 text-blue-700",
    "In Progress": "bg-purple-100 text-purple-700",
    Resolved: "bg-green-100 text-green-700",
    Closed: "bg-gray-200 text-gray-700"
  };

  return (
<div className="bg-white rounded-xl shadow-sm border p-5 flex flex-col gap-3 hover:shadow-md transition min-h-[180px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 line-clamp-1">
          {request.title}
        </h3>

        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[request.status]}`}>
          {request.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
        {request.description}
      </p>

      {/* Tags */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">

        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[request.priority]}`}>
          {request.priority}
        </span>

        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
          {request.category}
        </span>

      </div>

      {/* Meta */}
      <div className="flex justify-between text-xs text-gray-500 mb-3">
        <span>{request.createdBy?.name}</span>
        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Admin Controls */}
      {user?.role === "admin" && (
       <div className="flex items-center justify-between gap-2 border-t pt-3">
          <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="border text-sm rounded px-2 py-1 w-full"
>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

        <button
  onClick={handleUpdate}
  disabled={loading}
  className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 whitespace-nowrap"
>
            {loading ? "Saving..." : "Update"}
          </button>

        </div>
      )}

    </div>
  );
};

export default RequestCard;