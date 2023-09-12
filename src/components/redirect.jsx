import { Navigate, useNavigate } from "react-router-dom";
import NotFound from "../pages/notFound/notFound";

const Redirect = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (userRole === undefined) {
    navigate("/users");
  }

  return <Navigate to={!userRole || token ? "/" : <NotFound />} />;
};

export default Redirect;
