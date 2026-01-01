"use client";
import Navbar from "../components/Navbar";
import HeroSection from "../components/landing/HeroSection";
import StatsSection from "../components/landing/StatsSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import CoreCapabilities from "../components/landing/CoreCapabilities";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import FAQSection from "../components/landing/FAQSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

// This is the main container for the Landing Page.
// It doesn't hold complex logic; instead, it stacks all the different sections
// (like Hero, Stats, Features) on top of each other to build the full page.
export default function LandingPage() {
  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ background: "var(--bg-main)" }}
    >
      {/* The Navigation Bar sits at the top */}
      <Navbar />
      
      {/* The main sections of the page follow in order */}
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CoreCapabilities />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <CTASection />
      
      {/* The Footer sits at the very bottom */}
      <Footer />
    </div>
  );
}