import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import {RiAdminFill} from "react-icons/ri";
import toast from 'react-hot-toast';
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { FaEnvelope, FaUser } from "react-icons/fa";

const Navbar = ({ isloggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem("email");
    localStorage.removeItem('userid');
    localStorage.removeItem('role') 
    // localStorage.
    toast.success("Logged out!");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const outsideHandler = (e) => {
    if (e.target.className.includes("bg-black")) {
      setModal(false);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 min-h-[53px] h-[8vh]  flex items-center justify-center">
      <div className="container mx-auto flex justify-between items-center">
        {/* Avatar and greeting */}
        <div
          className="text-white hover:text-gray-400 flex items-center gap-2 cursor-pointer"
          onClick={() => setModal(true)}
        >{localStorage.getItem('role')=='admin'?<RiAdminFill size={24} />:<RxAvatar size={24} />}
          
          <p className="hidden 1x:block">Hello {isloggedIn ? (localStorage.getItem('role')=='admin'?"Admin":localStorage.getItem('user')) : "Guest"}!</p>
          <p className="1x:hidden">Hello!</p>
        </div>

        <Link to="/" className="text-white text-lg font-bold hidden md:block">
          Book Store
        </Link>

        {/* Navbar links */}
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
          {!isloggedIn &&
            <>
              <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
              <Link to="/signup" className="text-white hover:text-gray-400">Sign Up</Link>
            </>
          }
          {isloggedIn &&
            <div
              className="text-white hover:text-gray-400 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          }
        </div>
      </div>

      {/* Modal */}
      {modal &&
        <div
          className="fixed z-10 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={outsideHandler}
        >
           <div
          onClick={(event) => event.stopPropagation()}
          className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4  flex flex-col relative"
        >
          <AiOutlineClose
            className="absolute right-6 top-6  text-3xl text-red-600 cursor-pointer"
            onClick={()=>setModal(false)}
          />
          <div className="flex justify-between">
          <h2 className="w-fit bg-green-300 rounded-lg px-4 py-2">
            {
              isloggedIn?
              (localStorage.getItem('role')=='admin'?"ADMINISTRATOR":"BOOK STORE")
              :
              ("BOOK STORE")
            }
          </h2>
          
          </div>

          
          <h4 className="my-2 text-gray-500">{localStorage.getItem("userid")?(localStorage.getItem("userid")):"Welome to this BookStore!"}</h4>
          <div className="flex justify-start items-center gap-x-2">
            {localStorage.getItem("role")=='admin'?<RiAdminFill className="text-blue-300 text-2xl" size={24}/>:<FaUser className="text-blue-300 text-2xl" size={24}/>}
            {/* <FaUser className="text-blue-300 text-2xl" size={24}/> */}
            <h2 className="my-1">{localStorage.getItem('user')?localStorage.getItem('user'):"Guest"}</h2>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <FaEnvelope className="text-blue-300 text-2xl" size={24} />
            <h2 className="my-1">
  {localStorage.getItem('email') ? (
    localStorage.getItem('email')
  ) : (
    <>
      Mail us at{' '}
      <a href="mailto:mcaro0095@gmail.com" className="hover:underline font-bold">
        mcaro0095@gmail.com
      </a>
    </>
  )}
</h2>
          </div>
          
          {/* <p className="mt-4">Anything you want to show</p>
          <p>
          </p> */}
        </div>
        </div>
      }
    </nav>
  );
};

export default Navbar;
