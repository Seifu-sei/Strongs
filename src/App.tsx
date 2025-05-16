import { useState, useEffect } from "react";
import { useLocation } from "./hooks/useLocation";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import ResourcesPage from "./pages/ResourcesPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import ThemeProvider from "./context/ThemeProvider";
import EventsPage from "./hooks/EventsPage";

function App() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderPage = () => {
    switch (location.pathname) {
      case "/":
        return <HomePage />;
      case "/about":
        return <AboutPage />;
      case "/article":
        return <ArticlePage />;
      case "/resources":
        return <ResourcesPage />;
      case "/events":
        return <EventsPage />;
      case "/search":
        return <SearchPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header isScrolled={isScrolled} />
        <main className="flex-grow">{renderPage()}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
