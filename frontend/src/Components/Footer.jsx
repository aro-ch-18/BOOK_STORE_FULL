import React from "react";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaMailBulk, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 h-[10vh] min-h-16 flex items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center ">
        {/* Footer Links */}
        <div className="  hidden md:flex  md:flex-row gap-4 mb-4 md:mb-0">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/notfound" className="hover:text-gray-400">About Us</Link>
          <Link to="/notfound" className="hover:text-gray-400">Contact</Link>
          {/* <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link> */}
        </div>

        {/* Social Media Icons */}
        <div className="md:flex gap-4 mb-4 hidden  md:mb-0">
          {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaFacebookF size={20} />
          </a> */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaTwitter size={20} />
          </a>
          <a href="https://www.instagram.com/_aro.ch_18/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaInstagram size={20} />
          </a>
        
        </div>

        {/* Contact Information */}
        <div className="text-center md:text-right">
          <p className="mb-1">&copy; {new Date().getFullYear()} Arohan. All rights reserved.</p>
          <div className="flex gap-4 md:hidden items-center justify-center">
          <a href="mailto:mcaro0095@gmail.com"  target="_blank"  className=" hover:text-gray-400 "><FaEnvelope size={20}/></a>
          <a href="https://www.instagram.com/_aro.ch_18/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 " >
            <FaInstagram size={20} />
          </a>

          </div>

         
          <p className="text-sm hidden md:block">Email: <a href="mailto:info@arohan.com" className="hover:underline">mcaro0095@gmail.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
