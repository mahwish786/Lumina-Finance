// frontend/components/AuthForm.jsx

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import AuthImageSide from "./auth/AuthImageSide";
import AuthFormSide from "./auth/AuthFormSide";

// This is the container component that holds the logic for authentication.
// It manages the state (email/password) and talks to the backend API.
export default function AuthForm({ initialMode = "login" }) {

  // Toggle between login and signup mode
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const router = useRouter();

  // Store form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // If user is already logged in (has token), send them to dashboard
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  // Switch mode handler
  const toggleMode = () => setIsLogin(!isLogin);

  // Update state when typing
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Check if fields are empty
    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && !formData.username)
    ) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const endpoint = isLogin ? "login" : "register";
    try {
      // 2. Call the API
      const res = await axios.post(
        `http://localhost:5000/api/auth/${endpoint}`,
        // `/api/auth/${endpoint}`, // Use this line for production with a Next.js API route
        formData
      );
      if (isLogin) {
        // Login success: Save token and go to dashboard
        localStorage.setItem("token", res.data.data.token);
        toast.success("Welcome back!");
        router.replace("/dashboard");
      } else {
        // Signup success: Switch to login view
        toast.success("Account created successfully! Logging you in...");
        setIsLogin(true);
      }
    } catch (err) {
      // 3. Handle Errors (e.g., wrong password, email exists)
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="row w-100 overflow-hidden shadow-lg"
        style={{
          maxWidth: "1000px",
          borderRadius: "24px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          minHeight: "600px",
        }}
      >
        {/* Left Side: The Picture */}
        <AuthImageSide isLogin={isLogin} />

        {/* Right Side: The Form Inputs */}
        <AuthFormSide
          isLogin={isLogin}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          toggleMode={toggleMode}
          loading={loading}
        />
      </motion.div>
    </div>
  );
}
