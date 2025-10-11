import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signinStart,
  signinFailluer,
  signinSuccess,
} from "../redox/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signinFailluer(data.message));
        return;
      }
      dispatch(signinSuccess(data));
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      dispatch(signinFailluer(error.message));
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       setLoading(true);
  //       setError(false);
  //       const res = await fetch("/api/auth/login", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(formData),
  //       });
  //       const data = await res.json();
  //       if (data.success === false) {
  //         setError(data.message);
  //         setLoading(false);
  //         return;
  //       }
  //       navigate("/login");
  //       setLoading(false);
  //       setError(false);
  //       console.log(data.message);
  //     } catch (error) {
  //       setLoading(false);
  //       setError(error.message);
  //     }
  //   };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl text-center m-5 font-semibold">Login</h1>
      <form className=" flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          onChange={handleChange}
          className="p-3 outline-none border rounded-lg bg-white"
          id="email"
        />
        <input
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="p-3 outline-none border rounded-lg bg-white"
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-600 text-white font-semibold uppercase p-3 rounded-lg hover:bg-slate-500 disabled:bg-slate-500"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="flex gap-2 mt-4">
        <p> Dont have an account?</p>{" "}
        <Link to={"/signup"}>
          <span className="text-blue-600"> Signup</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
