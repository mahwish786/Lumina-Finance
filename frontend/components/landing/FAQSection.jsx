"use client";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";
import { containerVariants, itemVariants, fadeUp } from "../../utils/animations";

// A simple list of Frequently Asked Questions.
export default function FAQSection() {
  const faqs = [
    {
      q: "Is my financial data secure?",
      a: "Absolutely. We use industry-standard encryption for all data transmission and storage. Your financial details are never shared with third parties.",
    },
    {
      q: "Can I export my transaction history?",
      a: "Yes! You can export your entire transaction history as a PDF report directly from your dashboard for tax or record-keeping purposes.",
    },
    {
      q: "Is Lumina Finance free to use?",
      a: "Lumina is currently free for all personal users. We are rolling out premium features for business teams soon.",
    },
  ];

  return (
    <section className="py-5" style={{ background: "var(--bg-main)" }}>
      <div className="container py-4">
        
        {/* Title */}
        <motion.div
          className="text-center mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="fw-bold" style={{ color: "var(--text-primary)" }}>
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div className="row justify-content-center">
          <motion.div
            className="col-lg-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="accordion" id="faqAccordion">
              {faqs.map((item, i) => (
                <motion.div
                  key={i}
                  className="mb-3 rounded-3 overflow-hidden"
                  style={{ border: "1px solid var(--border-color)" }}
                  variants={itemVariants}
                >
                  <div className="p-4" style={{ background: "var(--bg-card)" }}>
                    <div className="d-flex align-items-start gap-3">
                      <FaQuestionCircle
                        className="mt-1 flex-shrink-0"
                        style={{ color: "var(--primary-blue)" }}
                      />
                      <div>
                        <h5
                          className="fw-bold mb-2"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.q}
                        </h5>
                        <p
                          className="m-0"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}