"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";

// A grid showing 4 additional features or capabilities of the platform.
export default function CoreCapabilities() {
  const capabilities = [
    {
      title: "Record Management",
      desc: "Digitize and organize records securely.",
      icon: "📄",
    },
    {
      title: "Smart Categorization",
      desc: "Auto-sort expenses to reduce tax stress.",
      icon: "🏷️",
    },
    {
      title: "Deep Analytics",
      desc: "Deep insights into spending habits.",
      icon: "📊",
    },
    {
      title: "Secure Access",
      desc: "Role-based permissions and encryption.",
      icon: "🔒",
    },
  ];

  return (
    <section className="py-5" style={{ background: "var(--bg-card)" }}>
      <div className="container">

        {/* Section Header with a Link */}
        <motion.div
          className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-5 gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="fw-bold" style={{ color: "var(--text-primary)" }}>
              Core Platform Capabilities
            </h2>
            <p className="m-0" style={{ color: "var(--text-secondary)" }}>
              Everything you need to manage your money efficiently.
            </p>
          </div>
          <Link
            href="/login"
            className="text-decoration-none fw-bold"
            style={{ color: "var(--primary-blue)" }}
          >
            View Features &rarr;
          </Link>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          className="row g-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {capabilities.map((item, i) => (
            <motion.div key={i} className="col-sm-6 col-lg-3" variants={itemVariants}>
              <motion.div
                whileHover={{ y: -5 }} // Adds a slight lift effect when hovered
                className="modern-card p-4 h-100"
                style={{ background: "var(--bg-main)" }}
              >
                <div className="fs-2 mb-3">{item.icon}</div>
                <h5
                  className="fw-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h5>
                <p
                  className="small mb-0"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}