/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* http://localhost:3000/registration*/
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [data, setdata] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const Datahandling = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();
  const Datasubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/registration",
        data
      );
      await console.log(data);
      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <form
      onSubmit={Datasubmit}
      className="w-full h-screen bg-amber-100 flex flex-col justify-center items-center font-mono"
    >
      <div className="flex flex-col gap-4 w-[18rem]">
        {/* Username */}
        <div className="flex justify-between items-center">
          <label htmlFor="username" className="font-bold w-[30%]">
            Username:
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={Datahandling}
            className="border rounded w-[70%] pl-2 font-bold"
            required
            name="username"
          />
        </div>

        {/* Name */}
        <div className="flex justify-between items-center">
          <label htmlFor="name" className="font-bold w-[30%]">
            Name:
          </label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="border rounded w-[70%] pl-2 font-bold"
            required
            name="name"
            onChange={Datahandling}
          />
        </div>

        {/* Email */}
        <div className="flex justify-between items-center">
          <label htmlFor="email" className="font-bold w-[30%]">
            Email:
          </label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            className="border rounded w-[70%] pl-2 font-bold"
            required
            name="email"
            onChange={Datahandling}
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
            className="border rounded w-[70%] pl-2 font-bold"
            required
            name="password"
            onChange={Datahandling}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-8 border rounded px-4 py-1 font-bold shadow-md hover:bg-amber-50 cursor-pointer"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Registration;
