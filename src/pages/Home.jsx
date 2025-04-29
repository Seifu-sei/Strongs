import { Link } from "react-router-dom";
import strongsIcon from "../assets/icons/strongs.png"; // Import the image
import WebinarsSlider from "../components/WebinarsSlide";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section
        id="hero"
        className="relative h-[85vh] bg-gray-100 overflow-hidden"
      >
        <img
          src={strongsIcon}
          title="Strongs icon"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-4">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Welcome to Strongs
            </h1>
            <p className="text-lg md:text-xl">
              STRONGS is a multifaceted non-profit organization with a singular
              aim of turning sinners to saints, equipping them and saints to
              soul winners,_ using every means available, making sure that all
              gifts, talents and potentials is maximized. While the young people
              are out major focus, we reach every age group using the means
              available.
            </p>
          </div>
        </div>
      </section>

      {/* Clubs Section */}
      <section id="clubs" className="bg-gray-50 px-4 md:px-12 py-12">
        <h2 className="text-2xl font-bold mb-6">Strongs Clubs & Webinars</h2>

        <div className="space-y-8">
          {[
            {
              title: "Bible Club",
              description:
                "An inspiring and indepth study on gospel truth, spiritual growth, or daily Christian living.",
              image: "/images/bible-club.jpg",
              link: "/clubs",
            },
            {
              title: "Musicians Club",
              description:
                "Gospel music centered on worship, praise and evangelism from the Strongs team.",
              image: "/images/musicians-club.jpg",
              link: "/clubs",
            },
            {
              title: "Teens Club",
              description:
                "Equip teenagers with biblical insight, destiny building, and spiritual growth teachings.",
              image: "/images/teens-club.jpg",
              link: "/clubs",
            },
            {
              title: "Writers Club",
              description:
                "Content creation, gospel articles, and script writing for the kingdom.",
              image: "/images/writers-club.jpg",
              link: "/clubs",
            },
          ].map((club, index) => (
            <div key={index} className="flex gap-4 border-b pb-4 items-center">
              <div className="w-24 h-24 bg-gray-300 rounded overflow-hidden">
                <img
                  src={strongsIcon}
                  alt={`${club.title} Thumbnail`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{club.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{club.description}</p>
                <Link
                  to={club.link}
                  className="text-blue-600 text-sm mt-2 inline-block"
                >
                  Explore {club.title} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Webinars Slider */}
      <section id="events">
        <h2 className="text-2xl font-bold mb-6 ml-12">
          Past And Upcoming Events
        </h2>
        <WebinarsSlider />
      </section>

      {/* Newsletter or CTA */}
      <section
        id="newsletter"
        className="bg-white px-4 md:px-12 py-12 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Stay Up to Date</h2>
        <p className="text-gray-600 mb-6">
          Get daily devotionals, gospel-centered contents, bible techings and
          also information about our upcoming events when we come near your
          location directly into your inbox.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring w-64 max-w-full"
        />
        <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Subscribe
        </button>
      </section>
      <h2 className="text-3xl font-bold mb-0 text-center">"What We Do"</h2>
      <section className="mt-0 bg-gradient-to-b from-blue-900 to-black text-white px-6 md:px-20 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Crusades & Conferences */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              Crusades & Conferences
            </h3>
            <ul className="space-y-2 list-disc list-inside text-gray-300 text-sm">
              <li>Gospel Crusades</li>
              <li>Rural Evangelism</li>
              <li>Secondary School Students Fire Conference</li>
              <li>Teens AFlame (Yet to be launched)</li>
              <li>Campus AFlame</li>
              <li>Students Mission Conference</li>
              <li>Youth AFlame</li>
              <li>Children for Christ</li>
            </ul>
          </div>

          {/* Weekly Meetings */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              Weekly Meetings
            </h3>
            <ul className="space-y-2 list-disc list-inside text-gray-300 text-sm">
              <li>Children Bible Club</li>
              <li>Bible Club</li>
              <li>Book Club</li>
            </ul>
          </div>

          {/* Monthly Symposiums & Webinars */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              Monthly Symposiums & Webinars (Online)
            </h3>
            <ul className="space-y-2 list-disc list-inside text-gray-300 text-sm">
              <li>Writers' Symposium</li>
              <li>Musicians' Symposium</li>
              <li>Teenagers & Secondary School Symposium</li>
            </ul>
          </div>

          {/* Workshops & Hangouts */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              Workshops & Hangouts
            </h3>
            <ul className="space-y-2 list-disc list-inside text-gray-300 text-sm">
              <li>Writers’ Hangout</li>
              <li>Music Ministers' Hangout</li>
            </ul>
          </div>

          {/* Professional Missions */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              Professional Missions
            </h3>
            <ul className="space-y-2 list-disc list-inside text-gray-300 text-sm">
              <li>STRONGS Educational Mission</li>
              <li>STRONGS Medical Mission</li>
              <li>STRONGS Tech and Media Mission</li>
              <li>STRONGS School Outreach</li>
              <li>STRONGS Career and Professional Outreach</li>
              <li>STRONGS Prison Outreach</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
