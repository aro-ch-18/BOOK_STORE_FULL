import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PinInput } from '../Components/pinInput';
// import { t } from 'tar';
import PulseLoader from "react-spinners/PulseLoader";



// const [eotp,setEotp]=useState("")
const Signup = ({setIsLoggedIn}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const[detailsgot,setDetailsgot]=useState(false);
  const [eotp,setEotp] = useState(null)
  const [message, setMessage] = useState('');
  const [spin,setSpin]=useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const callApi = async () => {
    const data = {
      email: formData.email,
    };

    try {
      console.log("before call");
      setSpin(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/sendMail`, data);
      setSpin(false);
      console.log("Aftern Call");
      setEotp(response.data.pass); 
      // Assuming the OTP is returned in response.data.pass
      console.log('Email sent successfully');
      // console.log(response.data.pass);

      setDetailsgot(true);
    } catch (error) {
      setSpin(false);
      setMessage("Error in sending OTP! Try Again later.")
      console.error('Error sending email:', error);
      // Handle error, e.g., display a message to the user
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    callApi();

  };
  const signupApi=async()=>{
    
    try {
      setSpin(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, formData);
      setSpin(false);
      setMessage(response.data.message);
      // setIsLoggedIn(true);
      navigate('/login');
      toast.success('Signup successful. Please login to continue!')
    } catch (error) {
      setMessage(error.response.data.message);
    }
  }
  const pinSubmit = (pinChild) => {
    // console.log("pin",pinChild);
    // console.log("otp",eotp)
    if (pinChild == eotp) {
      setDetailsgot(false)
      signupApi();
      
    }
    else{
      toast.error("Invalid OTP!")
      setDetailsgot(false);
      
    }

    
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {
        spin?
        <><PulseLoader color="#13d1e1" /></>:

      (
        !detailsgot?
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        {message && <p className="mb-4 text-center text-blue-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
      :
        <PinInput length={4} pinSubmit={pinSubmit}></PinInput>
)
}
    </div>
  );
};

export default Signup;