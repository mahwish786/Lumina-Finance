  // frontend/components/landing/HowItWorks.jsx

  "use client";
  import { motion } from "framer-motion";
  import { FaUserPlus, FaListUl, FaChartPie } from "react-icons/fa";
  import {
    containerVariants,
    itemVariants,
    fadeUp,
  } from "../../utils/animations";

  // Shows the 3-step process (Create Account -> Log -> Visualize)
  export default function HowItWorks() {
    const steps = [
      {
        title: "1. Create Account",
        desc: "Sign up securely in seconds. We use bank-grade encryption to protect your identity.",
        icon: <FaUserPlus size={32} className="text-primary" />,
        color: "var(--primary-blue)",
      },
      {
        title: "2. Log Transactions",
        desc: "Add income and expenses effortlessly. Upload receipts and categorize instantly.",
        icon: <FaListUl size={32} className="text-success" />,
        color: "var(--success-color)",
      },
      {
        title: "3. Visualize Growth",
        desc: "Watch your dashboard update in real-time. Export reports and analyze trends.",
        icon: <FaChartPie size={32} style={{ color: "#a855f7" }} />,
        color: "#a855f7",
      },
    ];

    return (
      <section className="py-5" style={{ background: "var(--bg-main)" }}>
        <div className="container py-4">
          <motion.div
            className="text-center mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2
              className="fw-bold display-6"
              style={{ color: "var(--text-primary)" }}
            >
              Master Your Money in 3 Steps
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              No complex setup. Just clear, actionable financial data.
            </p>
          </motion.div>

          <motion.div
            className="row g-4 text-center relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {steps.map((step, i) => (
              <motion.div key={i} className="col-md-4" variants={itemVariants}>
                <motion.div whileHover={{ y: -10 }} className="p-4">
                  {/* Step Icon in a circle */}
                  <div
                    className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle shadow-lg"
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "var(--bg-card)",
                      border: `1px solid ${step.color}`,
                    }}
                  >
                    {step.icon}
                  </div>
                  <h4
                    className="fw-bold mt-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.title}
                  </h4>
                  <p style={{ color: "var(--text-secondary)" }}>{step.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }
