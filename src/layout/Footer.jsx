import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">GeoPulse</h2>
            <p className="text-sm text-gray-400">
              Providing precise geographical boundaries to target users.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <a href="/about" className="text-gray-300 hover:text-white">
              About
            </a>
            <a href="/services" className="text-gray-300 hover:text-white">
              Services
            </a>
            <a href="/contact" className="text-gray-300 hover:text-white">
              Contact
            </a>
            <a href="/faq" className="text-gray-300 hover:text-white">
              FAQ
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-4">
          &copy; {new Date().getFullYear()} GeoPulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
