import { useParams, Navigate } from "react-router-dom";
import AddCard from "./AddCard";

// For web navigation
const VALID_STATUS = [
    "all",
    "watching",
    "complete",
    "plantowatch",
    "onhold",
    "dropped",
];

// For status name
const _STATUS = {
  all: "All",
  watching: "Watching",
  complete: "Completed",
  plantowatch: "Plan to Watch",
  onhold: "On Hold",
  dropped: "Dropped",
};

/* --- List all categories --- */
const ListByStatus = () => {
  const { status } = useParams();

  // Navigate to /list/all if invalid location provided
  if (!VALID_STATUS.includes(status)) {
    return <Navigate to="/list/all" replace />;
  }

  return (
    <div>
      <h1 className="text-xl font-bold capitalize pb-8">{status}</h1>
      <AddCard statusCat={_STATUS[status]} />
    </div>
  );
};

export default ListByStatus;
