
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';

// Validation schemas
const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const AuthPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isLoading, login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('login');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/passes');
    }
  }, [user, navigate]);
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const result = loginSchema.safeParse({ email: loginEmail, password: loginPassword });
      
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      await login(loginEmail, loginPassword);
    } catch (error) {
      // Error handled in auth context
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const result = registerSchema.safeParse({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        confirmPassword: registerConfirmPassword,
      });

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      await register(registerName, registerEmail, registerPassword);
    } catch (error) {
      // Error handled in auth context
    }
  };
  
  return (
    <div className="pt-24 pb-12 flex items-center justify-center min-h-[85vh] sacred-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-4"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading text-secondary mb-2">
            🙏 श्री बैद्यनाथ धाम
          </h1>
          <p className="text-muted-foreground font-body">
            Begin your sacred journey
          </p>
        </div>

        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted">
            <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Register
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="sacred-card">
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-xl text-secondary">Welcome Back</CardTitle>
                <CardDescription className="font-body">
                  Enter your credentials to continue your darshan booking
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-body">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="border-border focus:border-primary"
                    />
                    {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-body">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="border-border focus:border-primary"
                    />
                    {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In 🙏"}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-primary hover:underline"
                    >
                      Create one
                    </button>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card className="sacred-card">
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-xl text-secondary">Create Account</CardTitle>
                <CardDescription className="font-body">
                  Join millions of devotees on their spiritual journey
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-body">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your full name" 
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                      className="border-border focus:border-primary"
                    />
                    {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="font-body">Email</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                      className="border-border focus:border-primary"
                    />
                    {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="font-body">Password</Label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      placeholder="At least 6 characters"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      className="border-border focus:border-primary"
                    />
                    {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="font-body">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="Confirm your password"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      required
                      className="border-border focus:border-primary"
                    />
                    {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword}</p>}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account 🙏"}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-primary hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer text */}
        <p className="text-center text-sm text-muted-foreground mt-6 font-body">
          हर हर महादेव 🙏 | Har Har Mahadev
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
