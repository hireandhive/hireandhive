
"use client";

import "./Services.css";

export default function Services() {
  const services = [
    {
      number: "01",
      title: "General Labour Workers",
      description:
        "Find workers for general labour, physical tasks, daily work, and other workforce requirements.",
    },
    {
      number: "02",
      title: "Loading & Unloading Workers",
      description:
        "Hire workers to load, unload, move, and arrange goods, materials, equipment, and furniture.",
    },
    {
      number: "03",
      title: "Construction Workers",
      description:
        "Find workers for construction assistance, site support, material handling, and related tasks.",
    },
    {
      number: "04",
      title: "Cleaning Workers",
      description:
        "Get workers for cleaning homes, offices, commercial spaces, and other work locations.",
    },
    {
      number: "05",
      title: "Event & Catering Staff",
      description:
        "Find workers for event setup, food serving, kitchen assistance, decoration, and cleanup.",
    },
    {
      number: "06",
      title: "Warehouse & Packing Workers",
      description:
        "Hire workers for packing, sorting, stock handling, organizing goods, and warehouse support.",
    },
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="services-heading">
          <p className="services-label">OUR SERVICES</p>

          <h2>
            Find Workers for
            <span> Every Type of Job</span>
          </h2>

          <p>
            From general labour and construction to cleaning,
            loading, packing, and event support, Hire & Hive
            helps you find suitable workers for your needs.
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