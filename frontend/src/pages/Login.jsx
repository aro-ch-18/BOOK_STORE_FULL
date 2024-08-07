import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link
import toast from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';
const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const []
  const[spin,setSpin]=useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    
    try {
      setSpin(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, { email, password });
      setSpin(false);
      // Handle successful login, save token, and redirect
      // console.log("Response", response)
      localStorage.setItem("email",response.data.user.email)
      localStorage.setItem("userid",response.data.user._id)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user.name);
      localStorage.setItem('role', response.data.user.role);
      // console.log('Login successful:', response.data);
      toast.success("Logged In!")
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setSpin(false);
      console.log(err)
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 min-h-[82vh]">{
      spin?
      <PulseLoader color="#13d1e1" />
      :
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
          <div className="text-center">
            <p className="text-gray-700 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
}
    </div>
  );
};

export default LoginPage;
