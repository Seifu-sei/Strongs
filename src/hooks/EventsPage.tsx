import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  registrationLink?: string;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const UpcomingEvents: Event[] = [
      {
        id: 1,
        title: "Student Mission Conference",
        date: "2025-08-16",
        location: "Lautech Inter-dominational Chapel",
        description: "Join us for Student Mission Conference 2025.",
        registrationLink: "/SmcRegistrationPage",
      },
      // Add more events as needed
    ];
    setEvents(UpcomingEvents);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Upcoming Events
        </h1>
        {events.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No events available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-8 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-400">
                    {event.title}
                  </h2>
                  <p className="mb-1 text-gray-700 dark:text-gray-300">
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p className="mb-1 text-gray-700 dark:text-gray-300">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    {event.description}
                  </p>
                </div>
                {event.registrationLink && (
                  <Link
                    to={event.registrationLink}
                    className="inline-block bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md font-medium transition-colors text-center mt-4"
                  >
                    Register for SMC
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
