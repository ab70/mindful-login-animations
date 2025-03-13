
import React, { useEffect, useRef } from 'react';
import { Shield, Lock } from 'lucide-react';

const AnimatedLogo: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-scale-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (logoRef.current) {
      observer.observe(logoRef.current);
    }
    
    return () => {
      if (logoRef.current) {
        observer.unobserve(logoRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={logoRef}
      className="relative flex items-center justify-center opacity-0 mb-6"
    >
      <div className="relative">
        <Shield 
          className="w-14 h-14 text-primary/80 animate-pulse-soft" 
          strokeWidth={1.5}
        />
        <Lock 
          className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" 
          strokeWidth={2}
        />
      </div>
      <div className="ml-4 text-left">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">SecureID</h1>
        <p className="text-sm text-muted-foreground">Identity Management</p>
      </div>
    </div>
  );
};

export default AnimatedLogo;
