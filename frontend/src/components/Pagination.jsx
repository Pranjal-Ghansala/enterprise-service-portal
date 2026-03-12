const Pagination = ({ pagination, setFilters }) => {

  const handlePage = (page) => {
    setFilters((prev) => ({
      ...prev,
      page
    }));
  };

  return (
    <div style={{ marginTop: "20px" }}>

      {Array.from({ length: pagination.pages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePage(i + 1)}
          style={{ marginRight: "5px" }}
        >
          {i + 1}
        </button>
      ))}

    </div>
  );
};

export default Pagination;