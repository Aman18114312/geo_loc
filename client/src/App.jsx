import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import About from "./pages/About";
import MapPage from "./pages/MapPage";
import TextFieldGenerator from "./components/Textfield";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Navbar /> {/* Navbar rendered outside of Routes */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/textfield" element={<TextFieldGenerator />} />
          <Route path="/maps" element={<MapPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
