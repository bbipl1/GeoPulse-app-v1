import React from 'react';

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="w-16 h-16 border-8 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default FullScreenLoader;
