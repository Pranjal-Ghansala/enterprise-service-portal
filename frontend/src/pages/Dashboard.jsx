import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
 import "../../src/index.css";
import RequestForm from "../components/RequestForm.jsx";
import RequestList from "../components/RequestList.jsx";
import Pagination from "../components/Pagination.jsx";
import FilterBar from "../components/FilterBar.jsx";
import useRequests from "../hooks/useRequests";
import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
    page: 1,
  });

const { requests, loading, error, addRequest, updateRequestStatus, pagination } = useRequests(filters);  const handleToggleForm = () => setShowForm(prev => !prev);

  const handleRequestSubmit = async (formData) => {
    const result = await addRequest(formData);
    if (result.success) setShowForm(false);
    return result;
  };

const handleUpdateStatus = async (id, status) => {
  if (typeof updateRequestStatus === "function") {
    await updateRequestStatus(id, status);
  }
};
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">

      {/* Navbar */}
      <Navbar />

      {/* Dashboard Body */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <aside className="w-72 bg-white shadow-md flex flex-col p-6 space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">Dashboard</h2>

          <button
            onClick={handleToggleForm}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Create Request
          </button>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <FilterBar filters={filters} setFilters={setFilters} />
          </div>

           {user?.role === "admin" && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Admin Panel
              </h3>

              <button className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded mb-2">
                Manage Users
              </button>

              <button className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded">
                View All Requests
              </button>
            </div>
          )}

          <div className="mt-auto text-gray-500 text-sm">
           Logged in as: 
<strong>{user?.name}</strong> 
({user?.role})
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 flex flex-col">

          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Service Requests</h1>
          </div>

         <RequestList
  requests={requests}
  loading={loading}
  error={error}
  updateStatus={handleUpdateStatus}
/>

          {pagination?.pages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination pagination={pagination} setFilters={setFilters} />
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-8 relative">
           {user?.role === "user" && (
  <button
    onClick={handleToggleForm}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
  >
    + Create Request
  </button>
)}
            <RequestForm onSubmit={handleRequestSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;