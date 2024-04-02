// Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import your logo

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 mr-4" /> {/* Logo */}
        <NavLink to="/" className="text-white text-lg font-bold">Home</NavLink>
      </div>
      <div>
        <NavLink to="/about-us" className="text-white text-lg mx-4">About Us</NavLink>
        <NavLink to="/contact" className="text-white text-lg">Contact Us</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
