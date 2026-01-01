"use client";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

// A popup modal asking "Are you sure?" before deleting something.
export default function DeleteModal({ confirmDelete, cancelDelete }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(5px)", // Blurs the background content
        background: "rgba(0,0,0,0.6)", // Darkens the background 
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="modern-card p-4 shadow-lg text-center"
        style={{
          maxWidth: "400px",
          width: "90%",
          border: "1px solid var(--border-color)",
        }}
      >
        <div
          className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "60px",
            height: "60px",
            background: "rgba(239, 68, 68, 0.1)",
            color: "#ef4444",
          }}
        >
          <FaExclamationTriangle size={24} />
        </div>
        <h4 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>
          Delete Transaction?
        </h4>
        <div className="d-flex gap-3 justify-content-center mt-4">
          <button
            onClick={cancelDelete}
            className="btn btn-outline-secondary px-4"
          >
            Cancel
          </button>
          <button onClick={confirmDelete} className="btn btn-danger px-4">
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
