import React, { useState, useEffect } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Simulate fetching events from an API
    const fetchEvents = async () => {
      const mockEvents: Event[] = [
        {
          id: 1,
          title: "Sunday Worship Service",
          date: "2025-05-18",
          location: "Main Church Hall",
          description: "Join us for a time of worship and fellowship.",
        },
        {
          id: 2,
          title: "Youth Bible Study",
          date: "2025-05-20",
          location: "Youth Center",
          description: "A study session for young believers.",
        },
        {
          id: 3,
          title: "Community Outreach Program",
          date: "2025-05-25",
          location: "City Park",
          description: "Spreading the gospel and helping the community.",
        },
      ];
      setEvents(mockEvents);
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Upcoming Events</h1>
      <div style={{ marginTop: "20px" }}>
        {events.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            No events available at the moment.
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2>{event.title}</h2>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>{event.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage;
