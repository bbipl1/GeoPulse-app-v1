import React from "react";

const Footer = () => {
  return (
    <footer className="bg-accent-bg text-accent-text py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">universalmapsolutions</h2>
            <p className="text-sm text-secondary-text">
              Providing precise geographical boundaries to target users.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <a href="/about" className="text-secondary-text hover:text-accent-text">
              About
            </a>
            <a href="/services" className="text-secondary-text hover:text-accent-text">
              Services
            </a>
            <a href="/contact" className="text-secondary-text hover:text-accent-text">
              Contact
            </a>
            <a href="/faq" className="text-secondary-text hover:text-accent-text">
              FAQ
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-secondary-text hover:text-accent-text">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-secondary-text hover:text-accent-text">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-secondary-text hover:text-accent-text">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-secondary-text text-sm mt-4">
          &copy; {new Date().getFullYear()} universalmapsolutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
