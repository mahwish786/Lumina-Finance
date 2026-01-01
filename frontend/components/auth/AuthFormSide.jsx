// frontend/components/auth/AuthFormSide.jsx

"use client";
import { FaEnvelope, FaLock, FaUser, FaArrowRight } from "react-icons/fa";

// The actual input fields for Login/Signup
export default function AuthFormSide({
  isLogin,
  formData,
  handleChange,
  handleSubmit,
  toggleMode,
  loading,
}) {
  return (
    <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
      {/* Header */}
      <div className="mb-4">
        <h3
          className="fw-bold display-6"
          style={{ color: "var(--text-primary)" }}
        >
          {isLogin ? "Sign In" : "Create Account"}
        </h3>
        <p className="text-secondary">Enter your details below to continue.</p>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* Username Field - Only show if Signing Up */}
        {!isLogin && (
          <div className="mb-3">
            <label className="small fw-bold mb-1 ms-1 text-secondary">
              FULL NAME
            </label>
            <div className="input-group">
              <span
                className="input-group-text border-end-0"
                style={{
                  background: "var(--bg-input)",
                  borderColor: "var(--border-color)",
                }}
              >
                <FaUser className="text-secondary" />
              </span>
              <input
                name="username"
                className="form-control border-start-0 ps-3"
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* Email Field */}
        <div className="mb-3">
          <label className="small fw-bold mb-1 ms-1 text-secondary">
            EMAIL ADDRESS
          </label>
          <div className="input-group">
            <span
              className="input-group-text border-end-0"
              style={{
                background: "var(--bg-input)",
                borderColor: "var(--border-color)",
              }}
            >
              <FaEnvelope className="text-secondary" />
            </span>
            <input
              name="email"
              type="email"
              className="form-control border-start-0 ps-3"
              placeholder="name@company.com"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="small fw-bold mb-1 ms-1 text-secondary">
            PASSWORD
          </label>
          <div className="input-group">
            <span
              className="input-group-text border-end-0"
              style={{
                background: "var(--bg-input)",
                borderColor: "var(--border-color)",
              }}
            >
              <FaLock className="text-secondary" />
            </span>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              className="form-control border-start-0 ps-3"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          className="btn btn-primary-blue w-100 py-3 mb-4 shadow-lg"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : isLogin
            ? "Sign In to Dashboard"
            : "Create My Account"}
        </button>
      </form>

      {/* Switch between Login and Signup modes */}
      <div className="text-center pt-3 border-top border-secondary border-opacity-10">
        <span className="text-secondary">
          {isLogin ? "Don't have an account? " : "Already a member? "}
        </span>
        <button
          onClick={toggleMode}
          className="btn btn-link text-decoration-none fw-bold p-0"
          style={{ color: "var(--primary-blue)" }}
        >
          {isLogin ? "Join Now" : "Sign In"} <FaArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}