// // src/components/AdminRoute.jsx
// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user")); // you might be storing JWT or user details

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// export default AdminRoute;
