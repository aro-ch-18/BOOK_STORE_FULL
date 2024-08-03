import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import toast from 'react-hot-toast';
const Navbar = ({isloggedIn,setIsLoggedIn}) => {
  console.log(isloggedIn)
  const navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success("Logged out!")
    setIsLoggedIn(false);
    navigate("/login")
    
  }
  return (
    <nav className="bg-gray-800 p-4">

      <div className="container mx-auto flex justify-between items-center">
      <div className="text-white hover:text-gray-400 flex items-center gap-2">
      <RxAvatar  size={24} />
          Hello {isloggedIn?localStorage.getItem('user'):"Guest"} !
        </div>
        
        <Link to="/" className="text-white text-lg font-bold">
        Book Store
          </Link>

        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>
          {!isloggedIn&&
            <>
            <Link to="/login" className="text-white hover:text-gray-400">
            Login
          </Link>
          <Link to="/signup" className="text-white hover:text-gray-400">
            Sign Up
          </Link>
            </>
          
}
          {isloggedIn&&<div className="text-white hover:text-gray-400" onClick={handleLogout}>
            Logout
          </div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;