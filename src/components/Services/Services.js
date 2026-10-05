"use client";

import "./Services.css";

export default function Services() {
  const services = [
    {
      number: "01",
      title: "Event Setup & Decoration",
      description:
        "Get workers for stage setup, decoration, chairs, tables, and venue arrangements.",
    },
    {
      number: "02",
      title: "Catering & Serving Staff",
      description:
        "Find workers for food serving, table assistance, kitchen support, and event catering.",
    },
    {
      number: "03",
      title: "Loading & Unloading",
      description:
        "Workers to load, unload, move, and arrange event materials, equipment, and furniture.",
    },
    {
      number: "04",
      title: "Event Cleanup",
      description:
        "Get support for cleaning and organizing the venue before or after your event.",
    },
    {
      number: "05",
      title: "General Event Support",
      description:
        "Workers for guest assistance, arrangements, and other event-day support requirements.",
    },
    {
      number: "06",
      title: "Venue Support",
      description:
        "Get workers for chair and table arrangements, seating areas, entry setup, and other venue support tasks.",
    },
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">

        <div className="services-heading">
          <p className="services-label">OUR SERVICES</p>

          <h2>
            Workers for every
            <span> event need</span>
          </h2>

          <p>
            Whether you need help with setup, serving, moving materials,
            or cleanup, find the workers you need for your event.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.number}>
              <div className="service-number">
                {service.number}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <button
                onClick={() =>
                  document
                    .getElementById("worker-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Request Workers →
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}