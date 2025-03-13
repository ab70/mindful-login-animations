
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Check, AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoginAnimation, useSequentialAnimation } from '@/hooks/useLoginAnimation';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { isVisible: formVisible } = useLoginAnimation(300);
  const { visibleItems } = useSequentialAnimation(3, 100, 500);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, let's assume login is successful if email contains "admin"
      if (email.includes('admin')) {
        setLoginStatus('success');
        
        // Show success toast
        toast({
          title: "Login successful",
          description: "Welcome back to SecureID",
          variant: "default",
        });
        
        // Redirect after successful animation
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setLoginStatus('error');
        
        // Show error toast
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        
        // Reset to idle after error animation
        setTimeout(() => {
          setLoginStatus('idle');
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginStatus('error');
      
      toast({
        title: "Login failed",
        description: "An error occurred, please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div 
      className={`w-full max-w-md ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 ease-out`}
    >
      <div className="glass-card p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-1 tracking-tight">Welcome Back</h2>
        <p className="text-sm text-muted-foreground mb-6">Sign in to your account to continue</p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div 
            className={`relative ${visibleItems[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-500 ease-out`}
          >
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email Address"
                className="glass-input pl-10 h-12 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          
          <div 
            className={`relative ${visibleItems[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-500 ease-out`}
          >
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="glass-input pl-10 h-12 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <a href="#" className="text-xs text-primary animated-underline">Forgot Password?</a>
            </div>
          </div>
          
          <div 
            className={`relative ${visibleItems[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-500 ease-out`}
          >
            <Button
              type="submit"
              className={`w-full h-12 rounded-lg font-medium relative overflow-hidden transition-all duration-300 ${
                loginStatus === 'success' ? 'bg-green-500 hover:bg-green-600' :
                loginStatus === 'error' ? 'bg-red-500 hover:bg-red-600' :
                'bg-primary hover:bg-primary/90'
              }`}
              disabled={loading}
            >
              <span className={`flex items-center justify-center gap-2 transition-opacity duration-300 ${loading || loginStatus !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>
                Sign In <ArrowRight className="h-4 w-4" />
              </span>
              
              <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${loading && loginStatus === 'idle' ? 'opacity-100' : 'opacity-0'}`}>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              
              <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${loginStatus === 'success' ? 'opacity-100' : 'opacity-0'}`}>
                <Check className="h-5 w-5 text-white" />
              </span>
              
              <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${loginStatus === 'error' ? 'opacity-100' : 'opacity-0'}`}>
                <AlertCircle className="h-5 w-5 text-white" />
              </span>
            </Button>
          </div>
          
          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-grow h-px bg-border"></div>
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-grow h-px bg-border"></div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 glass-input h-12 rounded-lg" 
              disabled={loading}
            >
              <Github className="h-4 w-4 mr-2" /> Github
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 glass-input h-12 rounded-lg" 
              disabled={loading}
            >
              <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </Button>
          </div>
        </form>
        
        <div className="text-center mt-8">
          <span className="text-sm text-muted-foreground">Don't have an account? </span>
          <a href="#" className="text-sm text-primary font-medium animated-underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
