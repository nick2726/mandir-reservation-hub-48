
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  User, 
  ChevronDown,
  Home,
  Ticket,
  BookOpen,
  LogOut,
  Video,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, profile, logout } = useAuth();
  
  // Get display name from profile or email
  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Devotee';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
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
  
  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-card/95 py-3 shadow-warm backdrop-blur-lg border-b border-border' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl">🙏</span>
            <div className="flex flex-col">
              <span className="text-lg font-heading font-semibold text-secondary group-hover:text-primary transition-colors">
                Baba Baidyanath
              </span>
              <span className="text-xs text-muted-foreground font-body -mt-1">
                Sacred Darshan Pass
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" label="Home" />
            <NavLink to="/passes" label="Book Pass" />
            <NavLink to="/live-darshan" label="Live Darshan" />
            <NavLink to="/services" label="Services" />
            
            {/* User Profile or Sign In */}
            {user ? (
              <div className="flex items-center gap-3 ml-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                      <Avatar className="h-8 w-8 border-2 border-primary/20">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-heading text-sm">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-body text-foreground">
                        {displayName}
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <div className="px-3 py-2 border-b border-border">
                      <p className="text-sm font-heading text-foreground">{displayName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                        <BookOpen className="h-4 w-4" />
                        <span>My Bookings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button 
                asChild 
                className="ml-4 bg-primary hover:bg-primary/90 text-primary-foreground font-body"
              >
                <Link to="/auth" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-muted transition-colors" 
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
            className="md:hidden bg-card border-t border-border shadow-warm"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                <MobileNavLink to="/" label="Home" icon={<Home size={18} />} />
                <MobileNavLink to="/passes" label="Book Pass" icon={<Ticket size={18} />} />
                <MobileNavLink to="/live-darshan" label="Live Darshan" icon={<Video size={18} />} />
                {user && (
                  <MobileNavLink to="/profile" label="My Bookings" icon={<BookOpen size={18} />} />
                )}
                
                <div className="pt-4 mt-2 border-t border-border">
                  {user ? (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary text-primary-foreground font-heading">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-heading text-sm text-foreground">{displayName}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleLogout}>
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="w-full bg-primary text-primary-foreground">
                      <Link to="/auth" className="flex items-center justify-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Sign In / Register
                      </Link>
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Desktop NavLink
const NavLink = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`font-body text-sm transition-colors relative py-1 ${
        isActive 
          ? 'text-primary font-medium' 
          : 'text-foreground hover:text-primary'
      }`}
    >
      {label}
      {isActive && (
        <motion.div 
          layoutId="activeNav"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
        />
      )}
    </Link>
  );
};

// Mobile NavLink with icon
const MobileNavLink = ({ to, label, icon }: { to: string; label: string; icon: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-body ${
        isActive 
          ? 'bg-primary/10 text-primary font-medium' 
          : 'text-foreground hover:bg-muted'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;
