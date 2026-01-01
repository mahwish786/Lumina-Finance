// frontend/components/Chatbot.jsx

"use client";
import { useState } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const qaData = {
  "How do I add an expense?": "Click the 'Add Transaction' panel on the left.",
  "Can I download reports?": "Yes! Click the 'Export PDF' button on the right.",
  "Is my data secure?": "We use JWT encryption and hashed passwords.",
  "What is Net Balance?": "It is your Total Income minus Total Expenses.",
  "Who created this?": "Built for Unified Mentor by a Full Stack Developer."
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([{ sender: 'bot', text: 'Hello! I am Lumina AI. How can I help?' }]);

  const handleAsk = (question) => {
    setChat(prev => [...prev, { sender: 'user', text: question }]);
    setTimeout(() => {
        setChat(prev => [...prev, { sender: 'bot', text: qaData[question] }]);
    }, 500);
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            className="btn btn-modern rounded-circle shadow-lg d-flex align-items-center justify-content-center"
            style={{ width: '60px', height: '60px' }}
            onClick={() => setIsOpen(true)}
          >
            <FaRobot size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="glass-card p-0 overflow-hidden d-flex flex-column"
            style={{ width: '350px', height: '500px', background: 'rgba(20, 20, 30, 0.95)' }}
          >
            {/* Header */}
            <div className="p-3 border-bottom border-secondary d-flex justify-content-between align-items-center" style={{background: 'rgba(255,255,255,0.05)'}}>
              <div className="d-flex align-items-center gap-2">
                <FaRobot className="text-info" />
                <h6 className="m-0 fw-bold">Lumina Assistant</h6>
              </div>
              <FaTimes style={{cursor: 'pointer'}} onClick={() => setIsOpen(false)} />
            </div>

            {/* Chat Area */}
            <div className="flex-grow-1 p-3 overflow-auto" style={{ scrollbarWidth: 'thin' }}>
              {chat.map((c, i) => (
                <div key={i} className={`d-flex mb-3 ${c.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div className={`p-2 px-3 rounded-3 ${c.sender === 'user' ? 'bg-primary text-white' : 'bg-dark border border-secondary text-light'}`} style={{maxWidth: '80%', fontSize: '0.9rem'}}>
                    {c.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="p-2 border-top border-secondary bg-dark">
                <p className="text-muted ms-2 mb-2" style={{fontSize: '0.75rem'}}>Suggested Questions:</p>
                <div className="d-flex flex-wrap gap-2 px-2 pb-2">
                    {Object.keys(qaData).map((q, i) => (
                    <button key={i} className="btn btn-outline-secondary btn-sm rounded-pill" style={{fontSize: '0.75rem'}} onClick={() => handleAsk(q)}>
                        {q}
                    </button>
                    ))}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}