import RequestCard from "./RequestCard.jsx";
import "../../src/index.css";

const RequestList = ({ requests = [], loading, error, updateStatus }) => {

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!requests.length) return <p>No service requests found.</p>;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">

      {requests.map((req) => (
        <RequestCard
          key={req._id}
          request={req}
          updateStatus={updateStatus}
        />
      ))}

    </div>
  );
};

export default RequestList;