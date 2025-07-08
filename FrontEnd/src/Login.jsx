/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, renderMatches, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [Approve, Setapprove] = useState({ username: "", password: "" });
  let navigate = useNavigate();

  const GetCredentials = (e) => {
    let { name, value } = e.target;
    e.preventDefault();
    Setapprove({ ...Approve, [name]: value });
  };

  const Authenticate = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:3000/login", {
        username: Approve.username,
        password: Approve.password,
      });
      if (data) {
        navigate("/dashboard");
      } else {
        alert("Something Went Wrong!!!😭");
      }
    } catch (error) {
      alert("Something Went Wrong!!");

    }
  };

  return (
    <>
      <form
        onSubmit={Authenticate}
        className="w-full h-screen bg-amber-100 flex flex-col justify-center items-center font-mono"
      >
        <div className="flex flex-col gap-4 w-[18rem]">
          {/* Username */}
          <div className="flex justify-between items-center">
            <label htmlFor="username" className="font-bold w-[30%]">
              Login:
            </label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              onChange={GetCredentials}
              className="border rounded w-[70%] pl-2 font-bold"
            />
          </div>

          {/* Password */}
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="font-bold w-[30%]">
              Password:
            </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={GetCredentials}
              className="border rounded w-[70%] pl-2 font-bold"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 border rounded px-4 py-1 font-bold shadow-md hover:bg-amber-50 cursor-pointer"
        >
          Login
        </button>
        <div className="flex">
          <p className="ml-[4rem] mt-[10px]">Don't have an account?</p>
          <Link to="/registration" className="pt-[10px] pl-[5px] text-blue-700">
            Sign Up
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
