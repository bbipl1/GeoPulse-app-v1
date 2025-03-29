import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useThemeContext } from "../contextProvider/ThemeContextProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");

  };
  

  return (
    <nav className="bg-primary-bg text-primary-text">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
        universalmapsolutions
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/about" className="hover:text-accent-text">About</a>
          <a href="/services" className="hover:text-accent-text">Services</a>
          <a href="/contact" className="hover:text-accent-text">Contact</a>
          <a href="/faq" className="hover:text-accent-text">FAQ</a>
          
          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-secondary-bg">
            {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-secondary-bg text-primary-text">
          <a href="/about" className="block py-2 px-4 hover:bg-accent-bg">About</a>
          <a href="/services" className="block py-2 px-4 hover:bg-accent-bg">Services</a>
          <a href="/contact" className="block py-2 px-4 hover:bg-accent-bg">Contact</a>
          <a href="/faq" className="block py-2 px-4 hover:bg-accent-bg">FAQ</a>
          
          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="w-full py-2 flex justify-center hover:bg-accent-bg">
            {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
