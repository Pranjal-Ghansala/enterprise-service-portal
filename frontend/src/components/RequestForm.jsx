import { useState } from "react";
 import "../../src/index.css";
 
const RequestForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Low"
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.category) {
      setError("All fields are required");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await onSubmit(form);

      if (!result.success) {
        setError(result.message);
      } else {
        setForm({ title: "", description: "", category: "", priority: "Low" });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Create Service Request</h3>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter request title"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Describe the request"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter category"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Request"}
        </button>
      </form>
    </div>
  );
};

export default RequestForm;