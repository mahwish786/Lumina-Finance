// frontend/components/landing/HeroSection.jsx

"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils/animations";

// This component displays the big "Welcome" area at the top of the home page.
export default function HeroSection() {
  return (
    <section className="container mt-5 pt-5 pb-5">
      <div className="row align-items-center">

        {/* LEFT SIDE: Text and Buttons */}
        <div className="col-lg-6 text-center text-lg-start">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>

            {/* LEFT SIDE: Text and Buttons */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2 rounded-pill"
            >
              v2.0 Now Available
            </motion.span>

            {/* Main Headline */}
            <h1
              className="display-3 fw-bold mb-4"
              style={{ lineHeight: 1.1, color: "var(--text-primary)" }}
            >
              Smart Finance Data, <br />
              <span style={{ color: "var(--primary-blue)" }}>
                Clearly Organized
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p
              className="lead mb-5"
              style={{ maxWidth: "90%", color: "var(--text-secondary)" }}
            >
              Streamline your financial life with an intuitive, enterprise-grade
              dashboard. Experience precision, compliance, and security in every
              transaction.
            </p>

            {/* Action Buttons: Login & Signup */}
            <div className="d-flex flex-column flex-lg-row gap-3 justify-content-center justify-content-lg-start">
              <Link
                href="/login"
                className="btn btn-primary-blue px-4 d-inline-flex"
              >
                View Dashboard
              </Link>
              <Link
                href="/signup"
                className="btn btn-custom-outline px-4"
              >
                Create Account
              </Link>
            </div>

            {/* Trust Badges (Small text below buttons) */}
            <div
              className="mt-5 d-flex gap-4 opacity-75 justify-content-center justify-content-lg-start"
              style={{ color: "var(--text-secondary)" }}
            >
              <small>Trusted by 10k+ users</small>
              <small>•</small>
              <small>GDPR Compliant</small>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: The 3D Illustration */}
        <div className="col-lg-6 mt-5 mt-lg-0 d-flex justify-content-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="position-relative w-100 d-flex justify-content-center"
          >
            <img
              src="/hero.png"
              alt="Finance Illustration"
              className="img-fluid"
              style={{
                width: "100%",
                maxWidth: "600px",
                filter: "drop-shadow(0 0 40px rgba(59, 130, 246, 0.4))", // Glow effect behind image
                transform: "scale(1.1)",
                display: "block",
                margin: "0 auto",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
