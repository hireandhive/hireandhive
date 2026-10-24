
"use client";

import "./HowItWorks.css";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Tell Us Your Requirements",
      description:
        "Share the type of work, number of workers needed, work location, duration, and other job requirements.",
    },
    {
      number: "02",
      title: "Find Suitable Workers",
      description:
        "We review your requirements and help connect you with suitable workers based on the type of work and your needs.",
    },
    {
      number: "03",
      title: "Get Your Work Done",
      description:
        "Connect with suitable workers and get your work completed according to your schedule and requirements.",
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works-container">
        <div className="section-heading">
          <p className="section-label">HOW IT WORKS</p>

          <h2>
            Finding the right workers
            <span> is simple</span>
          </h2>

          <p>
            Need workers for your business, project, or daily
            work? Tell Hire & Hive what you need, and we’ll help
            you find suitable workers for the job.
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
