import React from 'react';
import Navbar from '../components/Navbar';
import backgroundVideo from '../assets/backgroundvideo.mp4';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative">
      <Navbar />
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 opacity-50 z-0"></div> {/* Overlay to enhance text visibility */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <h1 className="text-white mb-32 text-5xl font-bold transition duration-500 hover:text-transparent hover:stroke-2 hover:stroke-white relative">
          Welcome to Our Website
          <NavLink to='/main' className="absolute bottom-0 left-0 right-0 flex justify-center mt-4 opacity-0 transition duration-500 hover:opacity-100">
            <a href="#_" className="inline-flex items-center justify-center h-12 px-8 py-0 text-lg font-semibold text-center text-gray-200 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-600 border-solid rounded-full cursor-pointer select-none hover:text-white hover:border-white focus:shadow-xs focus:no-underline">
              Get Started
            </a>
          </NavLink>
        </h1>
      </div>
    </div>
  );
};

export default Home;
