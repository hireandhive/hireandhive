
"use client";

import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-label">HIRE & HIVE</p>

        <h1>
          Find the Right
          <span> Workers </span>
          for Every Job
        </h1>

        <p className="hero-description">
          Looking for workers for your business, project, or
          daily work? Tell us your requirements, and we’ll help
          you find suitable workers for different types of jobs.
        </p>

        <div className="hero-actions">
          <button
            className="hero-button"
            onClick={() =>
              document
                .getElementById("worker-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Find Workers
          </button>

          <WhatsAppButton />
        </div>
      </div>
    </section>
  );
}
