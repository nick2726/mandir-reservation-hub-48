
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
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  // Mock user state - in a real app, this would come from auth context
  const [user, setUser] = useState({
    isLoggedIn: true,
    name: "Rajiv Kumar",
    avatar: ""
  });
  
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
            <span className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Babadham Pass</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Navigation Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 hover:bg-accent transition-colors">
                  Navigation
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/passes" className="flex items-center gap-2">
                    <Ticket className="h-4 w-4" />
                    <span>Passes</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User Profile or Sign In */}
            {user.isLoggedIn ? (
              <div className="flex items-center gap-3">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-sm font-medium"
                >
                  Welcome, {user.name}
                </motion.div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button className="flex items-center gap-2 w-full text-left">
                        Sign Out
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button asChild variant="outline" className="ml-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-accent transition-colors" 
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
                <div className="px-2 py-2 text-sm font-semibold text-muted-foreground">
                  NAVIGATION
                </div>
                <MobileNavLink to="/" label="Home" icon={<Home size={16} />} />
                <MobileNavLink to="/passes" label="Passes" icon={<Ticket size={16} />} />
                <MobileNavLink to="/profile" label="My Bookings" icon={<BookOpen size={16} />} />
                
                {user.isLoggedIn ? (
                  <div className="flex items-center justify-between px-4 py-3 mt-2 bg-primary/5 rounded-md">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm font-medium">{user.name}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full mt-2">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Mobile NavLink with icon
const MobileNavLink = ({ to, label, icon }: { to: string, label: string, icon: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;
