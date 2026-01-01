"use client";
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";

// This component displays the top 3 cards: Total Income, Expenses, and Net Balance.
export default function StatCards({ summary }) {
  const cards = [
    {
      title: "Total Income",
      amount: summary.totalIncome,
      icon: <FaArrowUp />,
      bg: "rgba(16, 185, 129, 0.1)", // Green tint
      text: "#10b981",
    },
    {
      title: "Total Expense",
      amount: summary.totalExpense,
      icon: <FaArrowDown />,
      bg: "rgba(239, 68, 68, 0.1)", // Red tint
      text: "#ef4444",
    },
    {
      title: "Net Balance",
      amount: summary.netIncome,
      icon: <FaWallet />,
      bg: "rgba(59, 130, 246, 0.1)", // Blue tint
      text: "#3b82f6",
    },
  ];

  return (
    <div className="row g-4 mb-5">
      {cards.map((item, i) => (
        <div key={i} className="col-md-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="modern-card d-flex align-items-center justify-content-between position-relative overflow-hidden"
          >
            
            {/* Decorative Blurred Circle in background */}
            <div
              className="position-absolute top-0 end-0 p-5 rounded-circle"
              style={{
                background: item.text,
                filter: "blur(60px)",
                opacity: 0.15,
                transform: "translate(30%, -30%)",
              }}
            ></div>

            {/* Amount Text */}
            <div style={{ zIndex: 1 }}>
              <p className="text-secondary mb-1 small text-uppercase fw-bold">
                {item.title}
              </p>
              <h2
                className="fw-bold mb-0 display-6"
                style={{ color: "var(--text-primary)" }}
              >
                ${item.amount}
              </h2>
            </div>

            {/* Icon Box */}
            <div
              className="rounded-3 p-3 d-flex align-items-center justify-content-center shadow-sm"
              style={{
                background: item.bg,
                color: item.text,
                width: "50px",
                height: "50px",
                zIndex: 1,
              }}
            >
              {item.icon}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
