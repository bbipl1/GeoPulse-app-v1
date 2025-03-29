import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary-bg text-primary-text">
      {/* Hero Section */}
      <header className="bg-secondary-bg text-primary-text text-center py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Track, Manage & Analyze Boundaries with universalmapsolutions</h1>
          <p className="text-lg mb-6 text-secondary-text">
            A powerful platform for visualizing and monitoring geographic boundaries in real-time.
          </p>
          <a href="/pages/custom-map" className="bg-accent-text hover:opacity-90 text-white px-6 py-3 rounded-lg">
            Get Started
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-12 px-6 grid md:grid-cols-3 gap-6">
        <div className="bg-secondary-bg shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2 text-accent-text">Real-Time Tracking</h3>
          <p className="text-secondary-text">Monitor your boundaries with live updates and seamless integration.</p>
        </div>
        <div className="bg-secondary-bg shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2 text-accent-text">Custom Boundaries</h3>
          <p className="text-secondary-text">Define and customize your geographical areas easily.</p>
        </div>
        <div className="bg-secondary-bg shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2 text-accent-text">Interactive Maps</h3>
          <p className="text-secondary-text">Use dynamic maps to visualize data effectively.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
