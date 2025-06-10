import React from "react";

const Header: React.FC = React.memo(() => {
  return (
    <header className="fixed top-0 left-0 right-0 px-4 py-6 sm:py-8 sm:px-6 lg:px-8 shadow-sm z-50 bg-white" role="banner">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">WeWantWaste</h1>
          </div>
          <div className="hidden sm:block font-medium">
            <span className="text-gray-700">Need help?</span>{" "}
            <a
              href="#contact"
              className="text-blue-700 hover:text-blue-500 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label="Contact Us"
            >
              Contact Us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
});

export default Header;
