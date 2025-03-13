
import React, { useEffect, useRef } from 'react';
import '../styles/login.css';

const LoginBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create particles
    const particlesCount = 30;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Remove any existing particles
    const existingParticles = container.querySelectorAll('.particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create new particles
    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position, size, and animation
      const size = Math.random() * 6 + 2; // 2-8px
      const posX = Math.random() * containerRect.width;
      const posY = Math.random() * containerRect.height;
      const duration = Math.random() * 20 + 10; // 10-30s
      const delay = Math.random() * 5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.opacity = (Math.random() * 0.6 + 0.2).toString(); // 0.2-0.8
      
      // Animation with keyframes
      particle.animate(
        [
          { transform: 'translateY(0) rotate(0deg)', opacity: particle.style.opacity },
          { transform: `translateY(-${Math.random() * 100 + 50}px) rotate(${Math.random() * 360}deg)`, opacity: '0' }
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          iterations: Infinity
        }
      );
      
      container.appendChild(particle);
    }
    
    // Clean up
    return () => {
      const particles = container.querySelectorAll('.particle');
      particles.forEach(particle => particle.remove());
    };
  }, []);
  
  return (
    <div className="login-background">
      <div className="blob-1"></div>
      <div className="blob-2"></div>
      <div className="particles-container" ref={containerRef}></div>
    </div>
  );
};

export default LoginBackground;
