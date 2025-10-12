import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signinFailluer,
  signinStart,
  signinSuccess,
} from "../redox/user/userSlice";

const Signup = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (error) dispatch(signinFailluer(null));
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signinFailluer(data.message));
        return;
      }
      navigate("/login");
      dispatch(signinSuccess(data));
    } catch (error) {
      dispatch(signinFailluer(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto ">
      <h1 className="text-3xl text-center m-5 font-semibold">Signup</h1>
      <form className=" flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          placeholder="Firstname"
          onChange={handleChange}
          className="p-3 outline-none border rounded-lg bg-white"
          id="firstname"
          required
        />
        <input
          placeholder="Surname"
          id="surname"
          onChange={handleChange}
          className="p-3 outline-none border rounded-lg bg-white"
          required
        />
        <input
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="p-3 outline-none border rounded-lg bg-white"
          required
        />
        <input
          placeholder="Password"
          id="password"
          type="password"
          onChange={handleChange}
          className="p-3 outline-none border rounded-lg bg-white"
          required
        />

        <button
          disabled={loading}
          className="bg-slate-600 text-white font-semibold uppercase p-3 rounded-lg hover:bg-slate-500 disabled:bg-slate-500"
          type="submit"
        >
          {loading ? "Loading..." : "Signup"}
        </button>
      </form>
      <div className="flex gap-2 mt-4">
        <p>have an account?</p>{" "}
        <Link to={"/login"}>
          <span className="text-blue-600"> login</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Signup;
