// frontend/components/auth/AuthImageSide.jsx

"use client";

// The decorative left side of the Login/Signup page
export default function AuthImageSide({ isLogin }) {
  return (
    <div className="col-md-6 d-none d-md-block p-0 position-relative">
      {/* Background Image with filters applied */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80) center/cover",
          filter: "brightness(0.5) sepia(0.2) hue-rotate(190deg)", // Cool blue filter effect
        }}
      ></div>
      
      {/* Overlay Text showing welcome message */}
      <div
        className="position-absolute bottom-0 start-0 p-5 text-white"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
        }}
      >
        <h2 className="fw-bold mb-2">
          {isLogin ? "Welcome Back." : "Start Your Journey."}
        </h2>
        <p className="opacity-75 lead" style={{ fontSize: "1rem" }}>
          Experience the next generation of financial tracking with real-time
          analytics.
        </p>
      </div>
    </div>
  );
}
