"use client";
import Link from 'next/link';
import { FaSun, FaMoon, FaSignOutAlt, FaWallet } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

// This component renders the top navigation bar.
// It is "sticky", meaning it stays visible even when you scroll down.
export default function Navbar() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  
  // Check if the user is logged in by looking for a token in their browser storage.
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token');

  // Handles the logout process: clears the token and sends the user to the login page.
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="glass-nav w-100">
      <div className="container py-3 d-flex justify-content-between align-items-center">
        
        {/* -- Logo and Brand Name -- */}
        <Link href="/" className="text-decoration-none d-flex align-items-center gap-2">
          {/* Animated Wallet Icon that tilts when hovered */}
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="rounded-3 d-flex align-items-center justify-content-center shadow-sm" 
            style={{width:'40px', height:'40px', background: 'var(--primary-blue)', color:'white'}}>
            <FaWallet size={20} />
          </motion.div>
          
          <div className="d-flex flex-column" style={{lineHeight: 1}}>
            <h5 className="m-0 fw-bold" style={{color: 'var(--text-primary)', letterSpacing:'-0.5px'}}>
              Lumina
            </h5>
            <small style={{fontSize:'0.65rem', letterSpacing:'1px', color:'var(--text-secondary)', textTransform:'uppercase'}}>
              Finance
            </small>
          </div>
        </Link>

        {/* -- Right Side Actions (Theme Toggle & Login/Logout) -- */}
        <div className="d-flex align-items-center gap-2">
          
          {/* Button to switch between Dark Mode and Light Mode */}
          <button 
            onClick={toggleTheme} 
            className="btn btn-link text-decoration-none p-2"
            style={{color: 'var(--text-secondary)', transition: 'color 0.2s'}}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {/* Show 'Logout' if user is logged in, otherwise show 'Sign In' */}
          {isLoggedIn ? (
            <button 
              onClick={handleLogout} 
              className="btn d-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-semibold"
              style={{
                color: 'var(--danger-color)', 
                background: 'transparent',
                border: '1px solid transparent',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <span>Logout</span>
              <FaSignOutAlt />
            </button>
          ) : (
            <Link href="/login" className="btn btn-primary-blue btn-sm px-4 rounded-pill">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}