// frontend/app/layout.js

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import ThemeProvider from '../components/ThemeProvider';
import { Inter } from 'next/font/google';

// --- NEW IMPORTS ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// -------------------

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LuminaFinance',
  description: 'Advanced Expense Tracker',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          {/* This container will show the toasts anywhere in your app */}
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}