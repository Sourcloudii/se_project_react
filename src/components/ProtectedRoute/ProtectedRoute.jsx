import { Navigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useContext } from "react";

function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  const { isLoggedIn } = useContext(CurrentUserContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/signup" state={{ from: location.pathname }} replace/>;
  }
  return children;
}

export default ProtectedRoute;