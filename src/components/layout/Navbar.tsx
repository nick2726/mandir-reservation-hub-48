
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-sm backdrop-blur-lg' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-primary">Babadham Pass</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/passes" label="Passes" />
            <NavLink to="/profile" label="My Bookings" />
            <Button asChild variant="outline" className="ml-2">
              <Link to="/auth">Sign In</Link>
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-dark shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <MobileNavLink to="/" label="Home" />
                <MobileNavLink to="/passes" label="Passes" />
                <MobileNavLink to="/profile" label="My Bookings" />
                <Button asChild className="w-full mt-2">
                  <Link to="/auth">Sign In</Link>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Desktop NavLink with hover effect
const NavLink = ({ to, label }: { to: string, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className="relative group">
      <span className={`font-medium transition-colors ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
        {label}
      </span>
      {isActive && (
        <motion.span 
          layoutId="navbar-indicator"
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
        />
      )}
    </Link>
  );
};

// Mobile NavLink
const MobileNavLink = ({ to, label }: { to: string, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={`block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'}`}>
      {label}
    </Link>
  );
};

export default Navbar;
