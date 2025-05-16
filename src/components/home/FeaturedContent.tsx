import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { navigate } from "../../hooks/useLocation";

interface FeaturedItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  path: string;
}

const featuredItems: FeaturedItem[] = [
  {
    id: 1,
    title: "Understanding God's Grace in Everyday Life",
    description:
      "Discover how God's grace manifests in our daily experiences and challenges.",
    image:
      "https://images.pexels.com/photos/8383656/pexels-photo-8383656.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Article",
    path: "/article",
  },
  {
    id: 2,
    title: "The Biblical Framework of Faith and Works",
    description:
      "Examining the relationship between faith and works in Christian theology.",
    image:
      "https://images.pexels.com/photos/1615776/pexels-photo-1615776.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Study",
    path: "/resources",
  },
  {
    id: 3,
    title: "Principles of Faithful Biblical Interpretation",
    description:
      "Learn the key principles for interpreting scripture faithfully and accurately.",
    image:
      "https://images.pexels.com/photos/2574619/pexels-photo-2574619.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Resource",
    path: "/resources",
  },
];

const FeaturedContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? featuredItems.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <div
          className={`relative w-full h-96 transition-opacity duration-300 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={featuredItems[currentIndex].image}
            alt={featuredItems[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-blue-800 rounded-full">
              {featuredItems[currentIndex].category}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              {featuredItems[currentIndex].title}
            </h3>
            <p className="mb-4 text-gray-200 max-w-2xl">
              {featuredItems[currentIndex].description}
            </p>
            <button
              onClick={() => navigate(featuredItems[currentIndex].path)}
              className="inline-flex items-center text-white font-medium hover:underline"
            >
              Read More
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {featuredItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsAnimating(false);
              }, 300);
            }}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index
                ? "w-8 bg-blue-800 dark:bg-blue-600"
                : "w-2 bg-gray-300 dark:bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedContent;
