
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Babadham Pass</h3>
            <p className="text-muted-foreground max-w-xs">
              Easy and secure booking system for Babadham Mandir passes. Plan your spiritual journey with convenience.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/passes" className="text-muted-foreground hover:text-primary transition-colors">Available Passes</Link></li>
              <li><Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">My Bookings</Link></li>
              <li><Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">Sign In</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Babadham Mandir</li>
              <li>Email: info@babadhammandir.org</li>
              <li>Phone: +91 XXXXX XXXXX</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Babadham Mandir Pass Booking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
