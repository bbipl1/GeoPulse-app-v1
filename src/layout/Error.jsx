import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-bg text-primary-text text-center px-4">
      <h1 className="text-6xl font-bold text-accent-text">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-secondary-text mt-2">Oops! The page you are looking for doesn't exist.</p>
      
      <Link to="/" className="mt-6 px-6 py-3 bg-accent-text text-primary-bg rounded-lg hover:opacity-90">
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
