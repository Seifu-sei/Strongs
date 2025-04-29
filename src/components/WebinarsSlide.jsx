import bibleStudy from "../assets/images/bible-study.jpg";
import CampusAflame from "../assets/images/CampusAflame.jpg";
import teens from "../assets/images/teens.jpg";
import lautechSmc from "../assets/images/lautech-smc.jpg";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function WebinarsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Campus aFlame",
      description:
        "A community of believers on campus, igniting the fire of God in students to the great commission. GO",
      image: CampusAflame,
      link: "/clubs",
    },
    {
      title: "Bible Club",
      description:
        "An inspiring and indepth study on gospel truth, spiritual growth, or daily Christian living.",
      image: bibleStudy,
      link: "/clubs",
    },
    {
      title: "Student Conference",
      description:
        "Equipping students with biblical knowledge, leadership training and evangelical teachings/trainings",
      image: lautechSmc,
      link: "/clubs",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {slide.title}
            </h2>
            <p className="text-lg md:text-2xl text-gray-200 mt-4 max-w-2xl">
              {slide.description}
            </p>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-700" />
      </button>
    </section>
  );
}
