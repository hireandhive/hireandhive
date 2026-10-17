"use client";

import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loader"></div>
      <p>Loading, please wait...</p>
    </div>
  );
}
