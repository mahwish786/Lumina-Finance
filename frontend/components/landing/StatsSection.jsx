"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/animations";

// A helper component that animates a number counting up (e.g., from 0 to 100).
// It only starts counting when the user scrolls it into view.
const Counter = ({ from = 0, to, duration = 2, decimals = 0 }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(parseFloat(value.toFixed(decimals)));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration, decimals]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
};

// This section displays key statistics (like '10k+ Users') in a grid.
export default function StatsSection() {
  const stats = [
    {
      label: "Records Managed",
      value: 10,
      suffix: "k+",
      color: "rgba(59, 130, 246, 0.15)",
    },
    {
      label: "Daily Users",
      value: 500,
      suffix: "+",
      color: "rgba(16, 185, 129, 0.15)",
    },
    {
      label: "Uptime",
      value: 99.9,
      suffix: "%",
      decimals: 1,
      color: "rgba(139, 92, 246, 0.15)",
    },
    {
      label: "Volume Tracked",
      value: 2,
      suffix: "M+",
      prefix: "$",
      color: "rgba(245, 158, 11, 0.15)",
      gradient: "linear-gradient(to right, #f59e0b, #fbbf24)",
    },
  ];

  return (
    <section className="py-2 mb-5">
      <div className="container">
        {/* The Grid Layout */}
        <motion.div
          className="row justify-content-center g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, i) => (
            // On mobile, each item takes 50% width (col-6).
            // On desktop, each item takes 25% width (col-md-3).
            <motion.div
              key={i}
              className="col-6 col-md-3"
              variants={itemVariants}
            >
              <div className="text-center p-4 position-relative">
                
                {/* Background Glow Effect */}
                <div
                  className="position-absolute top-50 start-50 translate-middle w-75 h-75 rounded-circle"
                  style={{
                    background: stat.color,
                    filter: "blur(30px)",
                    zIndex: 0,
                  }}
                ></div>

                {/* Number and Label Content */}
                <div className="position-relative" style={{ zIndex: 1 }}>
                  <h2
                    className="display-5 fw-bold mb-1"
                    style={
                      stat.gradient
                        ? {
                            background: stat.gradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }
                        : {}
                    }
                  >
                    {stat.prefix}
                    <Counter
                      from={0}
                      to={stat.value}
                      decimals={stat.decimals || 0}
                    />
                    {stat.suffix}
                  </h2>
                  <p
                    className="small text-uppercase fw-bold m-0"
                    style={{
                      color: "#94a3b8",
                      letterSpacing: "1px",
                      fontSize: "0.75rem",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}