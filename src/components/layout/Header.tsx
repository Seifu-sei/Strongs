import { useState, useContext } from "react";
import { Sun, Moon, Menu, X, Search } from "lucide-react";
import { navigate } from "../../hooks/useLocation";
import { ThemeContext } from "../../context/ThemeProvider";
import Logo from "../ui/Logo";

interface HeaderProps {
  isScrolled: boolean;
}

const Header = ({ isScrolled }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="#/" onClick={() => handleNavigation("/")}>
              Home
            </NavLink>
            <NavLink href="#/about" onClick={() => handleNavigation("/about")}>
              About
            </NavLink>
            <NavLink
              href="#/resources"
              onClick={() => handleNavigation("/resources")}
            >
              Resources
            </NavLink>
            <NavLink
              href="#/article"
              onClick={() => handleNavigation("/article")}
            >
              Articles
            </NavLink>
            <NavLink href="#/events" onClick={() => handleNavigation("/events")}>
              Events
            </NavLink>
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
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="#/" onClick={() => handleNavigation("/")}>
              Home
            </MobileNavLink>
            <MobileNavLink
              href="#/about"
              onClick={() => handleNavigation("/about")}
            >
              About
            </MobileNavLink>
            <MobileNavLink
              href="#/resources"
              onClick={() => handleNavigation("/resources")}
            >
              Resources
            </MobileNavLink>
            <MobileNavLink
              href="#/article"
              onClick={() => handleNavigation("/article")}
            >
              Articles
            </MobileNavLink>
            <MobileNavLink
              href="#/search"
              onClick={() => handleNavigation("/search")}
            >
              Search
            </MobileNavLink>
          </div>
          <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleTheme}
              className="flex items-center text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400"
            >
              {theme === "light" ? (
                <>
                  <Moon className="mr-3 h-5 w-5" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="mr-3 h-5 w-5" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
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

const MobileNavLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-800 dark:hover:text-blue-400 rounded-md transition-colors"
  >
    {children}
  </a>
);

export default Header;
