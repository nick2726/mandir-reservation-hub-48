
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Babadham Mandir</h3>
            <p className="text-muted-foreground max-w-xs">
              Experience the divine presence at one of India's most sacred Jyotirlingas. Book your temple pass for a blessed darshan.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Temple Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Aarti Timings</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Special Pujas</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Temple History</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Live Darshan</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Donations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/passes" className="text-muted-foreground hover:text-primary transition-colors">Available Passes</Link></li>
              <li><Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">My Bookings</Link></li>
              <li><Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">Sign In</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 shrink-0 text-primary" />
                <span>Baba Baidyanath Dham Temple, Deoghar, Jharkhand, India - 814112</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 shrink-0 text-primary" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 shrink-0 text-primary" />
                <span>info@babadhammandir.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Baba Baidyanath Dham Temple. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
