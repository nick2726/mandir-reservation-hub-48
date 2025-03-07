
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to your auth endpoint
      // For this demo, we'll simulate a successful login after validation
      
      // Basic validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user (in a real app, this would come from your backend)
      const loggedInUser = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        avatar: '' // Could be a generated avatar based on name
      };
      
      // Save user to localStorage (for persistence)
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      
      // Update state
      setUser(loggedInUser);
      
      // Show success toast
      toast({
        title: 'Logged in successfully',
        description: `Welcome back, ${loggedInUser.name}!`,
      });
      
      // Redirect to passes page
      navigate('/passes');
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message || 'Please check your credentials and try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Basic validation
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would register the user through your API
      
      // Show success toast
      toast({
        title: 'Registration successful',
        description: 'Your account has been created. Please log in.',
      });
      
      // Return to login tab
      return Promise.resolve();
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message || 'Please try again later',
        variant: 'destructive',
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');
    
    // Update state
    setUser(null);
    
    // Show toast
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    
    // Redirect to home page
    navigate('/');
  };
  
  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
