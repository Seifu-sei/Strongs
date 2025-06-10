import { useState, useEffect } from "react";
import { ArrowRight, Book, Video, Headphones, Calendar } from "lucide-react";
import { navigate } from "../hooks/useLocation";
import FeaturedContent from "../components/home/FeaturedContent";
import LatestArticles from "../components/home/LatestArticles";
import ScriptureWidget from "../components/home/ScriptureWidget";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroClasses = `transform transition-all duration-1000 ${
    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
  }`;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/1469145905/photo/light-filtering-through-a-keyhole.jpg?b=1&s=612x612&w=0&k=20&c=KTStAcAUwdx43k3vxs0PvqRXiNz6_4wHng4m8R6zJME=')] bg-center bg-cover opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${heroClasses}`}
              style={{ transitionDelay: "200ms" }}
            >
              Discover The Depth of God's Word
            </h1>
            <p
              className={`text-lg md:text-xl mb-8 text-blue-100 ${heroClasses}`}
              style={{ transitionDelay: "400ms" }}
            >
              Explore Biblical wisdom with comprehensive studies, articles, and
              resources to strengthen your faith and deepen your understanding.
            </p>
            <div
              className={`flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 ${heroClasses}`}
              style={{ transitionDelay: "600ms" }}
            >
              <button
                onClick={() => navigate("/resources")}
                className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
              >
                Explore Resources
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => navigate("/article")}
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-all"
              >
                Read Articles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Content
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our most impactful resources and articles that have helped
              thousands deepen their faith.
            </p>
          </div>
          <FeaturedContent />
        </div>
      </section>

      {/* Latest Articles and Scripture Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Latest Articles
              </h2>
              <LatestArticles />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Daily Scripture
              </h2>
              <ScriptureWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore By Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse our collection of resources organized by category
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              icon={<Book className="h-8 w-8" />}
              title="Articles & Studies"
              description="In-depth analysis and study of scripture"
              onClick={() => navigate("/article")}
            />
            <CategoryCard
              icon={<Video className="h-8 w-8" />}
              title="Video Sermons"
              description="Visual teachings and sermons"
              onClick={() => navigate("/resources")}
            />
            <CategoryCard
              icon={<Headphones className="h-8 w-8" />}
              title="Audio Content"
              description="Podcasts and audio resources"
              onClick={() => navigate("/resources")}
            />
            <CategoryCard
              icon={<Calendar className="h-8 w-8" />}
              title="Events"
              description="Upcoming conferences and events"
              onClick={() => navigate("/events")}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Subscribe to our newsletter to receive the latest articles,
              resources, and updates directly to your inbox.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md focus:outline-none text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-white text-blue-800 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center sm:justify-start"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const CategoryCard = ({
  icon,
  title,
  description,
  onClick,
}: CategoryCardProps) => (
  <div
    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    onClick={onClick}
  >
    <div className="text-blue-800 dark:text-blue-400 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default HomePage;
