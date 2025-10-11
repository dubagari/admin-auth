import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Privateroute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to={"/signup"} />;
};

export default Privateroute;
