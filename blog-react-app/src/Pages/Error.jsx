import { useNavigate, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  const navigate = useNavigate();

  const getErrorMessage = () => {
    if (error.status === 404) {
      return "The page you're looking for doesn't exist.";
    }
    if (error.status === 403) {
      return "You don't have permission to access this resource.";
    }
    if (error.status === 401) {
      return "Please log in to access this page.";
    }
    if (error.status >= 500) {
      return "Something went wrong on our end. Please try again later.";
    }
    return (
      error.data?.message || error.statusText || "An unexpected error occurred."
    );
  };

  const getErrorTitle = () => {
    if (error.status === 404) return "Page Not Found";
    if (error.status === 403) return "Access Denied";
    if (error.status === 401) return "Authentication Required";
    if (error.status >= 500) return "Server Error";
    return "Error Occurred";
  };
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-gray p-4">
      <div className="card shadow-lg w-100">
        <div className="card-body text-center">
          <h2 className="card-title text-danger mb-2">{getErrorTitle()}</h2>
          {error.status && (
            <div className="display-1 fw-bold text-danger mb-4">
              Error {error.status}
            </div>
          )}
          <p className="mb-4 text-secondary">{getErrorMessage()}</p>
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              Go Back
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
