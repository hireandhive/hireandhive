"use client";

import { useState } from "react";
import "./Header.css";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">

        <div className="logo">
          Hire <span>&</span> Hive
        </div>

        {/* Desktop Navigation */}
        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>

          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
            How It Works
          </a>

          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>

          <button
            className="header-button mobile-button"
            onClick={() => {
              setMenuOpen(false);
              document
                .getElementById("worker-form")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Find Workers
          </button>
        </nav>

        {/* Desktop Button */}
        <div className="header-actions">
          <WhatsAppButton />

          <button
            className="header-button desktop-button"
            onClick={() =>
              document
                .getElementById("worker-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Find Workers
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

      </div>
    </header>
  );
}