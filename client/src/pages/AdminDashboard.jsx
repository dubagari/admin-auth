import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchSignedUpUsers = async () => {
  //     try {
  //       const res = await fetch("/api/admin/users", {
  //         credentials: "include", // ✅ sends cookie for admin verification
  //       });

  //       const data = await res.json();

  //       if (res.ok) {
  //         // ✅ Only show users (exclude admin)
  //         const filteredUsers = data.filter((user) => user.role !== "admin");
  //         setUsers(filteredUsers);
  //       } else {
  //         setError(data.message || "Failed to fetch users");
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSignedUpUsers();
  // }, []);

  // if (loading) return <p className="text-center mt-4">Loading users...</p>;
  // if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Registered Users</h1>

        {users.length === 0 ? (
          <p>No registered users yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">#</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u._id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">
                    {u.firstname} {u.surname}
                  </td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">{u.role}</td>
                  <td className="border p-2">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Link to={"/create-product"}>
          <button className=" flex justify-center py-2 px-3 text-white uppercase bg-slate-900 text-center ">
            create product
          </button>
        </Link>
      </div>
    </>
  );
};

export default AdminDashboard;
