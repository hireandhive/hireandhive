
"use client";

import { useEffect, useState } from "react";
import "./AdminDashboard.css";

async function getRequirements() {
  const response = await fetch("/api/requirements", {
    method: "GET",
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch requirements"
    );
  }

  return result;
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatDateRange(start, end) {
  if (!start) return "—";

  const startDate = formatDate(start);
  const endDate = formatDate(end);

  return startDate === endDate
    ? startDate
    : `${startDate} – ${endDate}`;
}

function formatCurrency(amount) {
  return Number(amount || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

export default function AdminDashboard() {
  const [requirements, setRequirements] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequirements() {
      try {
        const data = await getRequirements();

        if (!Array.isArray(data)) {
          throw new Error("Invalid requirements response");
        }

        setRequirements(data);
      } catch (error) {
        console.error("Failed to load requirements:", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    loadRequirements();
  }, []);

  const totalWorkers = requirements.reduce(
    (total, item) => total + (Number(item.workers) || 0),
    0
  );

  const totalAmount = requirements.reduce(
    (total, item) => total + (Number(item.amount) || 0),
    0
  );

  const jobCategories = new Set(
    requirements.map((item) => item.jobType).filter(Boolean)
  ).size;

  return (
    <main className="admin-dashboard">
      <div className="admin-dashboard__container">
        <header className="admin-dashboard__header">
          <div>
            <p className="admin-dashboard__eyebrow">
              MANAGEMENT
            </p>

            <h1 className="admin-dashboard__title">
              Requirements
            </h1>

            <p className="admin-dashboard__subtitle">
              All customer job requests in one place.
            </p>
          </div>

          <div className="admin-dashboard__live">
            <span className="admin-dashboard__live-dot" />
            Live data
          </div>
        </header>

        {hasError ? (
          <div className="admin-dashboard__message admin-dashboard__message--error">
            Unable to load requirements. Please check your API
            and database connection.
          </div>
        ) : loading ? (
          <div className="admin-dashboard__message">
            Loading requirements...
          </div>
        ) : (
          <>
            <section className="admin-dashboard__stats">
              <article className="admin-dashboard__stat-card">
                <div className="admin-dashboard__stat-top">
                  <span className="admin-dashboard__stat-label">
                    Total Requests
                  </span>

                  <span className="admin-dashboard__stat-icon admin-dashboard__stat-icon--purple">
                    #
                  </span>
                </div>

                <p className="admin-dashboard__stat-value">
                  {requirements.length}
                </p>

                <p className="admin-dashboard__stat-note">
                  Customer submissions
                </p>
              </article>

              <article className="admin-dashboard__stat-card">
                <div className="admin-dashboard__stat-top">
                  <span className="admin-dashboard__stat-label">
                    Workers Required
                  </span>

                  <span className="admin-dashboard__stat-icon admin-dashboard__stat-icon--blue">
                    W
                  </span>
                </div>

                <p className="admin-dashboard__stat-value">
                  {totalWorkers}
                </p>

                <p className="admin-dashboard__stat-note">
                  Across all requests
                </p>
              </article>

              <article className="admin-dashboard__stat-card">
                <div className="admin-dashboard__stat-top">
                  <span className="admin-dashboard__stat-label">
                    Total Amount
                  </span>

                  <span className="admin-dashboard__stat-icon admin-dashboard__stat-icon--green">
                    ₹
                  </span>
                </div>

                <p className="admin-dashboard__stat-value">
                  {formatCurrency(totalAmount)}
                </p>

                <p className="admin-dashboard__stat-note">
                  Sum of submitted amounts
                </p>
              </article>

              <article className="admin-dashboard__stat-card">
                <div className="admin-dashboard__stat-top">
                  <span className="admin-dashboard__stat-label">
                    Job Categories
                  </span>

                  <span className="admin-dashboard__stat-icon admin-dashboard__stat-icon--orange">
                    J
                  </span>
                </div>

                <p className="admin-dashboard__stat-value">
                  {jobCategories}
                </p>

                <p className="admin-dashboard__stat-note">
                  Different job types
                </p>
              </article>
            </section>

            <section className="admin-dashboard__panel">
              <div className="admin-dashboard__panel-header">
                <div>
                  <h2 className="admin-dashboard__panel-title">
                    All Requirements
                  </h2>

                  <p className="admin-dashboard__panel-subtitle">
                    Customer and job details
                  </p>
                </div>

                <span className="admin-dashboard__record-count">
                  {requirements.length} records
                </span>
              </div>

              {requirements.length === 0 ? (
                <div className="admin-dashboard__message">
                  No requirements have been submitted yet.
                </div>
              ) : (
                <div className="admin-dashboard__table-wrapper">
                  <table className="admin-dashboard__table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Job Details</th>
                        <th>Location</th>
                        <th>Schedule</th>
                        <th>Workers</th>
                        <th>Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {requirements.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <div className="admin-dashboard__customer">
                              <span className="admin-dashboard__avatar">
                                {(item.customerName || "?")
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>

                              <div>
                                <p className="admin-dashboard__customer-name">
                                  {item.customerName || "Unknown"}
                                </p>

                                <p className="admin-dashboard__phone">
                                  {item.mobileNumber || "—"}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td>
                            <p className="admin-dashboard__job-name">
                              {item.jobType || "—"}
                            </p>

                            <p className="admin-dashboard__job-description">
                              {item.jobDescription || "—"}
                            </p>

                            <span className="admin-dashboard__gender">
                              {item.gender || "Any"}
                            </span>
                          </td>

                          <td>
                            <span className="admin-dashboard__location">
                              {item.workLocation || "—"}
                            </span>
                          </td>

                          <td>
                            <span className="admin-dashboard__date">
                              {formatDateRange(
                                item.startDate,
                                item.endDate
                              )}
                            </span>
                          </td>

                          <td>
                            <span className="admin-dashboard__workers">
                              {item.workers ?? 0}
                            </span>
                          </td>

                          <td>
                            <span className="admin-dashboard__amount">
                              {formatCurrency(item.amount)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        <footer className="admin-dashboard__footer">
          Requirements Management
        </footer>
      </div>
    </main>
  );
}
