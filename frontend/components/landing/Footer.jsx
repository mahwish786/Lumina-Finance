"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaWallet, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

// The website footer containing links, company info, and newsletter signup.
export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Handles the newsletter subscription logic
  const handleSubscribe = async () => {
    if (!email) return toast.warn("Please enter an email address.");

    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/subscribe", { email });
      // await axios.post("/api/subscribe", { email }); // Use this line for production with a Next.js API route
      toast.success("Subscribed successfully!");
      setEmail(""); // Clear input after success
    } catch (error) {
      const msg = error.response?.data?.message || "Subscription failed.";
      toast.error(msg);
    }
    setSubmitting(false);
  };

  return (
    <footer
      className="pt-5 pb-4"
      style={{
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <div className="container">
        <div className="row g-4 justify-content-between">
          {/* Column 1: Brand Info & Social Icons */}
          {/* Takes full width on mobile, 4 columns on large screens */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "32px",
                  height: "32px",
                  background: "var(--primary-blue)",
                  color: "white",
                }}
              >
                <FaWallet size={16} />
              </div>
              <h5
                className="m-0 fw-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Lumina Finance
              </h5>
            </div>
            <p
              className="small mb-4"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "300px",
                lineHeight: "1.6",
              }}
            >
              Empowering individuals and businesses with enterprise-grade
              financial tracking, real-time analytics, and secure data
              management.
            </p>

            {/* Social Media Links */}
            <div className="d-flex gap-3">
              {[FaTwitter, FaGithub, FaLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="d-flex align-items-center justify-content-center rounded-circle text-decoration-none transition-all"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary-blue)";
                    e.currentTarget.style.borderColor = "var(--primary-blue)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.borderColor = "var(--border-color)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Product Links */}
          {/* Takes half width on mobile, 2 columns on large screens */}
          <div className="col-6 col-lg-2">
            <h6
              className="fw-bold mb-3"
              style={{
                color: "var(--text-primary)",
                fontSize: "0.9rem",
                letterSpacing: "0.5px",
              }}
            >
              PRODUCT
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {["Dashboard", "Analytics", "Transactions", "Reports"].map(
                (item, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="text-decoration-none small"
                      style={{
                        color: "var(--text-secondary)",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "var(--primary-blue)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "var(--text-secondary)")
                      }
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3: Company Links */}
          {/* Takes half width on mobile, 2 columns on large screens */}
          <div className="col-6 col-lg-2">
            <h6
              className="fw-bold mb-3"
              style={{
                color: "var(--text-primary)",
                fontSize: "0.9rem",
                letterSpacing: "0.5px",
              }}
            >
              COMPANY
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {[
                "About Us",
                "Careers",
                "Privacy Policy",
                "Terms of Service",
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="text-decoration-none small"
                    style={{
                      color: "var(--text-secondary)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = "var(--primary-blue)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = "var(--text-secondary)")
                    }
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="col-lg-3 col-md-6">
            <h6
              className="fw-bold mb-3"
              style={{
                color: "var(--text-primary)",
                fontSize: "0.9rem",
                letterSpacing: "0.5px",
              }}
            >
              STAY UPDATED
            </h6>
            <p
              className="small mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Join our newsletter for the latest financial tips.
            </p>
            <div className="input-group">
              <input
                type="email"
                className="form-control form-control-sm border-end-0"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                style={{
                  background: "var(--bg-input)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
              <button
                onClick={handleSubscribe}
                disabled={submitting}
                className="btn btn-primary-blue btn-sm"
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                {submitting ? "..." : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        <hr
          className="my-4"
          style={{ borderColor: "var(--border-color)", opacity: 0.5 }}
        />

        {/* Copyright Section */}
        <div className="row">
          <div className="col-12 text-center text-md-start">
            <small style={{ color: "var(--text-secondary)" }}>
              &copy; {new Date().getFullYear()} Lumina Finance. All rights
              reserved.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
