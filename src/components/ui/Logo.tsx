import React from "react";
import defaultLogo from "../../assets/Strongs.png";

// Prefer "Strongs logo.png" if present
const assetMap = (import.meta as any).glob("../../assets/*", { eager: true, import: "default", query: "?url" }) as Record<string, string>;
const preferredLogo = assetMap["../../assets/Strongs logo.png"]; // note the space in filename
const logoUrl = preferredLogo || defaultLogo;

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="h-10 w-10 overflow-hidden rounded-full white-100 flex items-center justify-center">
        <img
          src={logoUrl}
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
