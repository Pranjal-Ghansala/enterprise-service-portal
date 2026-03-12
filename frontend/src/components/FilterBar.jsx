 import "../../src/index.css";

const FilterBar = ({ filters, setFilters }) => {

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="filter-bar">

<input
  type="text"
  name="search"
  placeholder="Search requests..."
  value={filters.search || ""}
  onChange={handleChange}
/>

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
      >
        <option value="">All Status</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
        <option>Closed</option>
      </select>

      <input
        type="text"
        name="category"
        placeholder="Filter by category"
        value={filters.category}
        onChange={handleChange}
      />



    </div>
  );
};

export default FilterBar;