"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFileDownload,
  FaFilter,
  FaArrowUp,
  FaArrowDown,
  FaCloudUploadAlt,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

export default function RecentActivity({
  transactions,
  filter,
  setFilter,
  downloadReport,
  handleEdit,
  initiateDelete,
}) {
  const [selectedTx, setSelectedTx] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = [
    "All",
    "Food",
    "Transport",
    "Salary",
    "Health",
    "Shopping",
    "Entertainment",
  ];

  // smooth scroll to the input form when the user clicks Edit
  const scrollToForm = () => {
    setTimeout(() => {
      const formSection = document.getElementById("transaction-form");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <>
      <div className="modern-card">
        {/* --- Header & Controls --- */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h4 className="fw-bold m-0" style={{ color: "var(--text-primary)" }}>
            Recent Activity
          </h4>
          <div className="d-flex align-items-center gap-3">
            
            {/* Export PDF Button */}
            <button
              onClick={downloadReport}
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
              style={{ height: "38px" }}
            >
              <FaFileDownload />
              <span className="btn-text-mobile">Export PDF</span>
            </button>

            {/* Category Filter Dropdown */}
            <div className="dropdown" style={{ position: "relative" }}>
              <button
                className="btn btn-sm d-flex align-items-center justify-content-between gap-2"
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  height: "38px",
                  minWidth: "40px",
                  backgroundColor: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <FaFilter className="text-secondary" />
                  <span className="btn-text-mobile">
                    {filter === "All" ? "All Categories" : filter}
                  </span>
                </div>
                <FaChevronDown size={10} className="text-secondary btn-text-mobile" />
              </button>

              <ul
                className={`dropdown-menu dropdown-menu-end ${showDropdown ? "show" : ""}`}
                style={{
                  position: "absolute",
                  inset: "0px 0px auto auto",
                  transform: "translate(0px, 40px)",
                }}
              >
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setFilter(cat);
                        setShowDropdown(false);
                      }}
                    >
                      {cat === "All" ? "All Categories" : cat}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Click outside to close dropdown */}
              {showDropdown && (
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 1 }}
                  onClick={() => setShowDropdown(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* --- Transaction List --- */}
        <div
          className="d-flex flex-column gap-2 custom-scrollbar"
          style={{ maxHeight: "720px", overflowY: "auto", paddingRight: "5px" }}
        >
          {transactions.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-secondary">No transactions found.</p>
            </div>
          ) : (
            transactions.map((t) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="d-flex justify-content-between align-items-center p-3 rounded transition-all"
                style={{
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-color)",
                  flexShrink: 0,
                }}
              >
                {/* Left: Icon, Title, Date */}
                <div className="d-flex align-items-center gap-3" style={{ overflow: "hidden" }}>
                  
                  {/* Icon Wrapper (Green for income, Red for expense) */}
                  <div
                    className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0`}
                    style={{
                      width: "45px",
                      height: "45px",
                      background:
                        t.type === "income"
                          ? "rgba(16, 185, 129, 0.1)"
                          : "rgba(239, 68, 68, 0.1)",
                    }}
                  >
                    {t.type === "income" ? (
                      <FaArrowUp className="text-success" />
                    ) : (
                      <FaArrowDown className="text-danger" />
                    )}
                  </div>

                  {/* Transaction Details */}
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h6
                      className="mb-0 fw-bold text-truncate mobile-title-truncate"
                      style={{
                        color: "var(--text-primary)",
                        maxWidth: "250px",
                      }}
                      title={t.description}
                    >
                      {t.description}
                    </h6>

                    <div className="d-flex gap-2 align-items-center mt-1 details-desktop">
                      <span
                        className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-10"
                        style={{ fontWeight: 500 }}
                      >
                        {t.category}
                      </span>
                      <small
                        className="text-secondary"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {new Date(t.date).toLocaleDateString()}
                      </small>
                      {t.receipt && (
                        <a
                          href={t.receipt}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary small d-flex align-items-center gap-1"
                          style={{
                            fontSize: "0.75rem",
                            textDecoration: "none",
                          }}
                        >
                          <FaCloudUploadAlt /> Receipt
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Actions */}
                <div className="d-flex align-items-center gap-3 ms-2">
                  <span
                    className={`fw-bold fs-5 ${
                      t.type === "income" ? "text-success" : "text-danger"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}${t.amount}
                  </span>

                  {/* Desktop Actions (Edit/Delete) */}
                  <div className="d-flex gap-2 actions-desktop">
                    <button
                      onClick={() => handleEdit(t)}
                      className="btn btn-soft-edit"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => initiateDelete(t._id)}
                      className="btn btn-soft-danger"
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>

                  {/* Mobile Action (View Details Modal) */}
                  <div className="actions-mobile">
                    <button
                      onClick={() => setSelectedTx(t)}
                      className="btn btn-outline-secondary btn-sm"
                      style={{ borderRadius: "8px", padding: "8px" }}
                    >
                      <FaEye size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* --- Mobile Details Modal --- */}
      {selectedTx && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1050,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedTx(null)}
        >
          <div
            className="modern-card w-100"
            style={{
              maxWidth: "400px",
              animation: "fadeIn 0.2s",
              backgroundColor: "var(--bg-card)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary border-opacity-25 pb-3">
              <h5 className="m-0 fw-bold" style={{ color: "var(--text-primary)" }}>
                Transaction Details
              </h5>
              <button
                className="btn p-0"
                style={{ color: "var(--text-primary)" }}
                onClick={() => setSelectedTx(null)}
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Modal Body: Amount & Title */}
            <div className="mb-4">
              <h4
                className="fw-bold mb-1 text-break"
                style={{ color: "var(--text-primary)" }}
              >
                {selectedTx.description}
              </h4>
              <span
                className={`fs-3 fw-bold ${
                  selectedTx.type === "income" ? "text-success" : "text-danger"
                }`}
              >
                {selectedTx.type === "income" ? "+" : "-"}
                ${selectedTx.amount}
              </span>
            </div>

            {/* Modal Body: Meta Data */}
            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Category</span>
                <span className="badge bg-primary bg-opacity-10 text-primary">
                  {selectedTx.category}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Date</span>
                <span style={{ color: "var(--text-primary)" }}>
                  {new Date(selectedTx.date).toLocaleDateString()}
                </span>
              </div>
              {selectedTx.receipt && (
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Receipt</span>
                  <a
                    href={selectedTx.receipt}
                    target="_blank"
                    className="text-primary text-decoration-none"
                  >
                    View Receipt
                  </a>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="d-flex gap-2 pt-2 border-top border-secondary border-opacity-25">
              <button
                onClick={() => {
                  handleEdit(selectedTx);
                  setSelectedTx(null);
                  scrollToForm();
                }}
                className="btn btn-primary w-50 d-flex align-items-center justify-content-center gap-2"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => {
                  initiateDelete(selectedTx._id);
                  setSelectedTx(null);
                }}
                className="btn btn-danger w-50 d-flex align-items-center justify-content-center gap-2"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}