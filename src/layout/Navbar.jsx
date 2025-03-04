import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          GeoPulse
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="/about" className="hover:text-gray-300">About</a>
          <a href="/services" className="hover:text-gray-300">Services</a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
          <a href="/faq" className="hover:text-gray-300">FAQ</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <a href="/about" className="block py-2 px-4 hover:bg-gray-700">About</a>
          <a href="/services" className="block py-2 px-4 hover:bg-gray-700">Services</a>
          <a href="/contact" className="block py-2 px-4 hover:bg-gray-700">Contact</a>
          <a href="/faq" className="block py-2 px-4 hover:bg-gray-700">FAQ</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
