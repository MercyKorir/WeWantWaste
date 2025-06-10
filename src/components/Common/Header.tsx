import React from "react";

const Header: React.FC = () => {
  return (
    <header className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-700">WeWantWaste</h1>
          </div>
          <div className="hidden sm:block text-white font-medium">
            <span className="text-gray-400">Need help?</span>{" "}
            <span className="text-blue-500 hover:text-blue-400 cursor-pointer">
              Contact Us
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
