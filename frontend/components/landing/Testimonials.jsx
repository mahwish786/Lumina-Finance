"use client";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { containerVariants, itemVariants, fadeUp } from "../../utils/animations";

// Displays user reviews/testimonials cards.
export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Freelance Designer",
      text: "Lumina changed how I handle my taxes. The export feature is a lifesaver.",
      color: "#3b82f6",
    },
    {
      name: "Michael Ross",
      role: "Small Business Owner",
      text: "Finally, a dashboard that isn't cluttered. It's clean, fast, and secure.",
      color: "#10b981",
    },
    {
      name: "David Chen",
      role: "Financial Analyst",
      text: "The categorization logic is spot on. I use it for my personal tracking daily.",
      color: "#8b5cf6",
    },
  ];

  return (
    <section className="py-5" style={{ background: "var(--bg-card)" }}>
      <div className="container py-4">

        {/* Section Heading */}
        <motion.div
          className="row align-items-center mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="col-lg-6">
            <h2 className="fw-bold" style={{ color: "var(--text-primary)" }}>
              Trusted by Professionals
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              See what our users are saying about Lumina Finance.
            </p>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="row g-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {testimonials.map((t, i) => (
            // Mobile: Stack. Desktop: 3 across (col-md-4).
            <motion.div key={i} className="col-md-4" variants={itemVariants}>
              <div
                className="p-4 h-100 rounded-4 position-relative"
                style={{
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-color)",
                }}
              >
                {/* Decorative Quote Icon */}
                <FaQuoteLeft
                  size={24}
                  style={{ color: t.color, opacity: 0.3 }}
                  className="mb-3"
                />

                {/* Review Text */}
                <p
                  className="mb-4"
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                  }}
                >
                  "{t.text}"
                </p>

                {/* User Details */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: t.color,
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h6
                      className="fw-bold m-0"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.name}
                    </h6>
                    <small style={{ color: "var(--text-secondary)" }}>
                      {t.role}
                    </small>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}