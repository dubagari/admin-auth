import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutFailluer,
  logoutStart,
  logoutSuccess,
} from "../redox/user/userSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = async () => {
    try {
      dispatch(logoutStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(logoutFailluer(data.message));
        return;
      }
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(logoutFailluer(error));
    }
  };
  return (
    <>
      <header className=" bg-slate-700 ">
        <nav className="p-6 max-w-6xl m-auto flex justify-between ">
          <Link to={"/"}>
            <h1 className="text-white font-semibold">
              MERN<span>logo</span>
            </h1>
          </Link>
          <ul>
            <li>
              <Link className="mr-5 text-white" to={"/"}>
                Home
              </Link>
              <Link className=" text-white" to={"/about"}>
                About
              </Link>
            </li>
          </ul>
          <Link className=" text-white" to={"/signup"}>
            {currentUser ? (
              <span onClick={handlelogout}>Logout</span>
            ) : (
              <span className=""> Signup</span>
            )}
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
