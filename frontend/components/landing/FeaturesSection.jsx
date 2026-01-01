"use client";
import { motion } from "framer-motion";
import { FaDatabase, FaChartLine, FaShieldAlt } from "react-icons/fa";
import { containerVariants, itemVariants, fadeUp } from "../../utils/animations";

// This section highlights the 3 main features: Records, Analytics, and Security.
export default function FeaturesSection() {
  const features = [
    {
      icon: <FaDatabase size={24} className="text-primary" />,
      bg: "bg-primary bg-opacity-10",
      title: "Transaction Records",
      desc: "Structured data tables for complete income, expense, and transfer tracking.",
    },
    {
      icon: <FaChartLine size={24} className="text-success" />,
      bg: "bg-success bg-opacity-10",
      title: "Analytics Reports",
      desc: "Visual data insights for spending performance, categorization, and growth.",
    },
    {
      icon: <FaShieldAlt size={24} className="text-info" />,
      bg: "bg-info bg-opacity-10",
      title: "Secure Management",
      desc: "Enterprise-grade encryption ensures your financial data never leaks.",
    },
  ];

  return (
    <section className="container py-5">
      
      {/* Section Title */}
      <motion.div
        className="text-center mb-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="fw-bold" style={{ color: "var(--text-primary)" }}>
          All Finance Data in One Place
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Access comprehensive records, generated reports, and schedules.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="row g-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {features.map((item, i) => (
          // On mobile: Stack vertically (col-12 by default).
          // On desktop: 3 items per row (col-md-4).
          <motion.div key={i} className="col-md-4" variants={itemVariants}>
            <div className="modern-card h-100">
              <div className={`mb-4 rounded p-3 d-inline-block ${item.bg}`}>
                {item.icon}
              </div>
              <h4 className="fw-bold" style={{ color: "var(--text-primary)" }}>
                {item.title}
              </h4>
              <p style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 