import React from "react";
import logo from "../../assets/Strongs.png";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="h-10 w-10 overflow-hidden rounded-full white-100 flex items-center justify-center">
        <img
          src={logo}
          alt="Strongs Logo"
          className="h-10 w-10 object-cover"
        />
      </div>
      <div className="ml-2">
        <h1 className="text-xl font-bold text-blue-800 dark:text-blue-400">
          STRONGS
        </h1>
        <span className="text-xs text-gray-600 dark:text-gray-400">
          The Spiritual Intellectuals
        </span>
      </div>
    </div>
  );
};

export default Logo;
