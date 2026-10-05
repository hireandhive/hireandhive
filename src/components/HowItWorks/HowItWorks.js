"use client";

import "./HowItWorks.css";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Tell Us Your Requirement",
      description:
        "Share details about the work, number of workers, location, duration, and your requirements.",
    },
    {
      number: "02",
      title: "We Find Suitable Workers",
      description:
        "We review your requirement and connect you with suitable workers based on your needs.",
    },
    {
      number: "03",
      title: "Get Your Work Done",
      description:
        "Connect with the workers and get your work completed as planned.",
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works-container">

        <div className="section-heading">
          <p className="section-label">HOW IT WORKS</p>

          <h2>
            Getting the right workers
            <span> is simple</span>
          </h2>

          <p>
            Tell us what you need, and we’ll help you find workers
            suitable for your job.
          </p>
        </div>

        <div className="steps">
          {steps.map((step) => (
            <div className="step-card" key={step.number}>
              <div className="step-number">{step.number}</div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}