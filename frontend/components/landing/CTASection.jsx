"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaRocket, FaArrowRight } from "react-icons/fa";

// The final "Call to Action" block before the footer to encourage signup.
export default function CTASection() {
  return (
    <section className="py-5 my-5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="position-relative rounded-5 overflow-hidden text-center p-5"
          style={{
            background: "#020617",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 80px -20px rgba(59, 130, 246, 0.3)",
          }}
        >
          {/* -- Background Animations (Blobs) -- */}
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="position-absolute rounded-circle"
            style={{
              width: "400px",
              height: "400px",
              background: "var(--primary-blue)",
              filter: "blur(120px)",
              opacity: 0.4,
              top: "-10%",
              left: "-10%",
              zIndex: 0,
            }}
          />
          <motion.div
            animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="position-absolute rounded-circle"
            style={{
              width: "400px",
              height: "400px",
              background: "#8b5cf6",
              filter: "blur(120px)",
              opacity: 0.3,
              bottom: "-10%",
              right: "-10%",
              zIndex: 0,
            }}
          />

          {/* -- Main CTA Content -- */}
          <div className="position-relative" style={{ zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="d-inline-flex align-items-center justify-content-center gap-2 px-3 py-1 rounded-pill mb-4"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span
                className="badge bg-success rounded-circle p-1"
                style={{ width: "8px", height: "8px" }}
              >
                {" "}
              </span>
              <small
                className="text-light opacity-75 fw-bold"
                style={{ fontSize: "0.75rem", letterSpacing: "1px" }}
              >
                FREE FOREVER FOR INDIVIDUALS
              </small>
            </motion.div>

            <h2 className="display-4 fw-bold text-white mb-4">
              Stop Tracking.{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  background: "linear-gradient(to right, #60a5fa, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Start Growing.
              </span>
            </h2>

            <p
              className="lead text-white opacity-75 mb-5 mx-auto"
              style={{ maxWidth: "650px" }}
            >
              Join 10,000+ financial pros who switched to Lumina. Get the
              clarity you need to make smarter money moves today.
            </p>

            {/* Buttons stack on mobile (flex-column) and align side-by-side on tablet+ (flex-sm-row) */}
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link href="/signup" className="text-decoration-none">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary-blue btn-lg px-5 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 shadow-lg w-100 w-sm-auto"
                  style={{ color: "#ffffff" }}
                >
                  <FaRocket /> Get Started Now
                </motion.button>
              </Link>

              <Link href="/login" className="text-decoration-none">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#ffffff",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto"
                  style={{
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#ffffff",
                  }}
                >
                  Live Demo <FaArrowRight size={14} />
                </motion.button>
              </Link>
            </div>

            <div className="mt-4 pt-2">
              <small className="text-white opacity-50">
                No credit card required · Cancel anytime
              </small>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}