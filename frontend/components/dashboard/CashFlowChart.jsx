"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// We need to register these parts so ChartJS knows how to draw a pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CashFlowChart({ transactions }) {
  // Logic to calculate Income vs Expense for the chart
  const processChartData = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    // Loop through transactions and sum them up
    transactions.forEach((t) => {
      if (t.type === "income") totalIncome += t.amount;
      else totalExpense += t.amount;
    });

    // If there is no data, show a placeholder grey circle
    if (totalIncome === 0 && totalExpense === 0)
      return {
        labels: ["No Data"],
        datasets: [{ data: [1], backgroundColor: ["#2a2e3d"], borderWidth: 0 }],
      };

    // Return the real data
    return {
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: [totalIncome, totalExpense],
          backgroundColor: ["#10b981", "#ef4444"], // Green for Income, Red for Expense
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    };
  };

  return (
    <div className="modern-card">
      <h5 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
        Cash Flow
      </h5>
      <div
        className="position-relative"
        style={{
          height: "300px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        {/* The Actual Chart Component */}
        <Doughnut
          data={processChartData()}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%", // Makes it a donut instead of a pie
            plugins: {
              legend: { position: "bottom", labels: { color: "#94a3b8" } },
            },
          }}
        />

        {/* Text inside the donut hole */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -80%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <span className="text-secondary small">Balance</span>
        </div>
      </div>
    </div>
  );
}
