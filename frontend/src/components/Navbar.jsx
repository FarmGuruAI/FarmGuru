import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Analysis', path: '/analysis' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-soil-dark/90 backdrop-blur-xl border-b border-soil-border py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Sprout className="w-8 h-8 text-primary-500 group-hover:text-primary-400 transition-colors" />
            <span className="text-white font-bold text-xl tracking-tight">
              SoilSense <span className="text-primary-500">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-400'
                    : 'text-gray-300 hover:text-primary-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Get Started Button */}
          <div className="hidden md:block">
            <Link
              to="/analysis"
              className="bg-primary-600 hover:bg-primary-500 text-white rounded-full px-6 py-2 text-sm font-medium transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-soil-dark/95 backdrop-blur-xl border-b border-soil-border shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMobileMenu}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-primary-400 bg-soil-card/50'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-soil-card/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/analysis"
              onClick={closeMobileMenu}
              className="block w-full text-center mt-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full px-6 py-3 text-base font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
