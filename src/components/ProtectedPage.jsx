import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router";
const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  if (loading) return <Loader></Loader>;
  return <>{children}</>;
};

export default ProtectedPage;