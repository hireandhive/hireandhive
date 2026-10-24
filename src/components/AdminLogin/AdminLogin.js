"use client";

import { useState } from "react";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid username or password.");
        return;
      }

      setIsLoggedIn(true);
      setPassword("");
    } catch (error) {
      console.error("Admin login failed:", error);
      setError("Unable to connect to the server. Please try again.");
    }
  }

  if (isLoggedIn) {
    return <AdminDashboard />;
  }

  return (
    <main className="admin-login">
      <section className="admin-login__card">
        <div className="admin-login__logo">A</div>

        <p className="admin-login__eyebrow">ADMINISTRATION</p>

        <h1 className="admin-login__title">Admin Login</h1>

        <p className="admin-login__subtitle">
          Sign in to access your dashboard.
        </p>

        <form className="admin-login__form" onSubmit={handleLogin}>
          <div className="admin-login__field">
            <label htmlFor="admin-username">Username</label>

            <input
              id="admin-username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-login__field">
            <label htmlFor="admin-password">Password</label>

            <input
              id="admin-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="admin-login__error" role="alert">
              {error}
            </p>
          )}

          <button className="admin-login__button" type="submit">
            Sign In
          </button>
        </form>

        <p className="admin-login__footer">Authorized administrators only</p>
      </section>
    </main>
  );
}
