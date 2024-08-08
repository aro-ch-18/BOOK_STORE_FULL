import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PinInput } from "../Components/pinInput";
import PulseLoader from "react-spinners/PulseLoader";

const Signup = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // console.log(formData)
  const [otpType, setOtpType] = useState("user");
  const [detailsGot, setDetailsGot] = useState(false);
  const [eotp, setEotp] = useState(null);
  const [message, setMessage] = useState("");
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const callApi = async (role) => {
    const data = { email: formData.email, role: role };

    try {
      setSpin(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/sendMail`,
        data
      );
      setSpin(false);
      // console.log(response.data.pass);

      setEotp(response.data.pass);
      setDetailsGot(true);
    } catch (error) {
      setSpin(false);
      setOtpType("user");
      setMessage("Error in sending OTP! Try Again later.");
      console.error("Error sending email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    callApi("user");
  };

  const signupApi = async () => {
    try {
      setSpin(true);
      // console.log(otpType)
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        formData
      );
      setSpin(false);
      setMessage(response.data.message);
      navigate("/login");
      toast.success("Signup successful. Please login to continue!");
    } catch (error) {
      setSpin(false);
      setOtpType("user");
      setMessage(error.response.data.message);
    }
  };

  const pinSubmit = (pinChild) => {
    if (pinChild === eotp) {
      if (otpType === "user") {
        // toast.success("Email Verification Successful!");
        if (formData.role == "admin") {
          toast.success("Now enter OTP sent to the Master Administrator!");
          setOtpType("admin");
          callApi("admin");
        } else {
          setDetailsGot(false);
          signupApi();
        }
      } else {
        setDetailsGot(false);
        signupApi();
      }
    } else {
      toast.error("Invalid OTP!");
      setMessage("");
      setOtpType("user");
      setDetailsGot(false);
    }
  };

  const handleRoleToggle = () => {
    setFormData({
      ...formData,
      role: formData.role === "user" ? "admin" : "user",
    });
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center bg-gray-100">
      {spin ? (
        <PulseLoader color="#13d1e1" />
      ) : !detailsGot ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
          {message && (
            <p className="mb-4 text-center text-blue-500">{message}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-700 text-sm font-bold">
                {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.role === "admin"}
                  onChange={handleRoleToggle}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4  peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all "></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      ) : otpType === "user" ? (
        <PinInput length={4} pinSubmit={pinSubmit} otpto={"user"}></PinInput>
      ) : (
        <PinInput length={4} pinSubmit={pinSubmit} otpto={"admin"}></PinInput>
      )}
    </div>
  );
};

export default Signup;
