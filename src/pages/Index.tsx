
import React, { useEffect, useRef } from 'react';
import LoginBackground from '@/components/LoginBackground';
import AnimatedLogo from '@/components/AnimatedLogo';
import LoginForm from '@/components/LoginForm';
import { useLoginAnimation } from '@/hooks/useLoginAnimation';

const Index = () => {
  const { isVisible: contentVisible } = useLoginAnimation(100);
  const { isVisible: imageVisible } = useLoginAnimation(600);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate the offset based on mouse position (small parallax effect)
      const moveX = (clientX - innerWidth / 2) / innerWidth * 15;
      const moveY = (clientY - innerHeight / 2) / innerHeight * 15;
      
      imageRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <LoginBackground />
      
      {/* Left side - Login form */}
      <div className={`w-full md:w-1/2 flex flex-col items-center justify-center p-8 ${contentVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        <div className="w-full max-w-md">
          <AnimatedLogo />
          <LoginForm />
        </div>
      </div>
      
      {/* Right side - Image and text */}
      <div className="hidden md:flex w-1/2 bg-primary/10 backdrop-blur-sm relative overflow-hidden">
        <div 
          className={`absolute inset-0 p-12 flex flex-col justify-center items-center ${imageVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 ease-in-out`}
        >
          <div 
            ref={imageRef}
            className="relative transition-transform duration-200 ease-out"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl blur-xl opacity-70 animate-pulse-soft"></div>
            <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-2xl w-full max-w-lg">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Enterprise-Grade Identity Management
              </h2>
              <p className="text-muted-foreground mb-6">
                Secure your organization with our advanced IAM solution. Protect your assets, 
                control access, and streamline authentication with our powerful platform.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Multi-Factor Auth</h3>
                    <p className="text-xs text-muted-foreground">Enhanced security layers</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">SSO Integration</h3>
                    <p className="text-xs text-muted-foreground">Seamless access control</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Role-Based Access</h3>
                    <p className="text-xs text-muted-foreground">Fine-grained permissions</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Compliance</h3>
                    <p className="text-xs text-muted-foreground">GDPR, HIPAA, ISO27001</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <img
                      alt="User"
                      className="h-8 w-8 rounded-full border-2 border-white object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&crop=faces&auto=format&fit=crop"
                    />
                    <img
                      alt="User"
                      className="h-8 w-8 rounded-full border-2 border-white object-cover"
                      src="https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&h=200&crop=faces&auto=format&fit=crop"
                    />
                    <img
                      alt="User"
                      className="h-8 w-8 rounded-full border-2 border-white object-cover"
                      src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&crop=faces&auto=format&fit=crop"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs font-medium"><span className="text-primary">10,000+</span> companies trust our platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background graphics */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default Index;
