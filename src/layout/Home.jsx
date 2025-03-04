import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
  
      {/* Hero Section */}
      <header className="bg-gray-900 text-white text-center py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Track, Manage & Analyze Boundaries with GeoPulse</h1>
          <p className="text-lg mb-6">A powerful platform for visualizing and monitoring geographic boundaries in real-time.</p>
          <a href="/pages/custom-map" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
            Get Started
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-12 px-6 grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
          <p className="text-gray-600">Monitor your boundaries with live updates and seamless integration.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Custom Boundaries</h3>
          <p className="text-gray-600">Define and customize your geographical areas easily.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Interactive Maps</h3>
          <p className="text-gray-600">Use dynamic maps to visualize data effectively.</p>
        </div>
      </section>

    
    </div>
  );
};

export default Home;
