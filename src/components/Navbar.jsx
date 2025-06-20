import { Link } from "react-router-dom";
import { useState } from "react";
import strongsIcon from "../assets/icons/strongs.png";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "Clubs", href: "#clubs" },
    { label: "Events", href: "#events" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between relative">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold text-gray-800"
      >
        <img src={strongsIcon} alt="Strongs Icon" className="h-8 w-8" />
        <span>Strongs</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {navItems.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-gray-700 hover:text-blue-600"
          >
            {label}
          </a>
        ))}

        {/* Search Input */}
        <div className="relative">
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
          </button>
          <div
            className={`absolute right-0 top-8 bg-white border border-gray-300 rounded-md shadow-lg p-2 transition-all duration-300 z-50 ${
              searchOpen ? "block" : "hidden"
            }`}
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-48 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring"
            />
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-700" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Dropdown Nav */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-white px-4 py-4 shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-[500px] opacity-100 translate-y-0 z-50"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        {navItems.map(({ label, href }) => (
          <Link
            key={label}
            to={href}
            className="block py-2 text-gray-700 hover:text-blue-600 border-b"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        {/* Search Input for Mobile */}
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring"
          />
        </div>
      </div>
    </nav>
  );
}
