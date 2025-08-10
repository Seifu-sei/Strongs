import { useState, useContext } from "react";
import { Sun, Moon, Search } from "lucide-react";
import { navigate } from "../../hooks/useLocation";
import { ThemeContext } from "../../context/ThemeProvider";
import Logo from "../ui/Logo";

interface HeaderProps {
  isScrolled: boolean;
}

const Header = ({ isScrolled }: HeaderProps) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <Logo />
            </div>
          </div>

          {/* Desktop Navigation only */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="#/" onClick={() => handleNavigation("/")}>Home</NavLink>
            <NavLink href="#/about" onClick={() => handleNavigation("/about")}>About</NavLink>
            <NavLink href="#/resources" onClick={() => handleNavigation("/resources")}>Resources</NavLink>
            <NavLink href="#/article" onClick={() => handleNavigation("/article")}>Articles</NavLink>
            <NavLink href="#/events" onClick={() => handleNavigation("/events")}>Events</NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleNavigation("/search")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className="text-gray-800 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 text-base font-medium transition-colors duration-200"
  >
    {children}
  </a>
);

export default Header;
