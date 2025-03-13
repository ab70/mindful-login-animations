
import React, { useEffect, useRef } from 'react';
import '../styles/login.css';

const LoginBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create particles
    const particlesCount = 50; // Increased particle count
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
      const size = Math.random() * 8 + 2; // 2-10px
      const posX = Math.random() * containerRect.width;
      const posY = Math.random() * containerRect.height;
      const duration = Math.random() * 30 + 15; // 15-45s
      const delay = Math.random() * 8;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.opacity = (Math.random() * 0.7 + 0.2).toString(); // 0.2-0.9
      
      // Animation with keyframes
      particle.animate(
        [
          { transform: 'translateY(0) rotate(0deg)', opacity: particle.style.opacity },
          { transform: `translateY(-${Math.random() * 150 + 80}px) rotate(${Math.random() * 360}deg)`, opacity: '0' }
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          iterations: Infinity
        }
      );
      
      container.appendChild(particle);
    }
    
    // Add floating light effects
    const lightsCount = 5;
    for (let i = 0; i < lightsCount; i++) {
      const light = document.createElement('div');
      light.classList.add('floating-light');
      
      const size = Math.random() * 200 + 100; // 100-300px
      const posX = Math.random() * containerRect.width;
      const posY = Math.random() * containerRect.height;
      const duration = Math.random() * 40 + 30; // 30-70s
      
      light.style.width = `${size}px`;
      light.style.height = `${size}px`;
      light.style.left = `${posX}px`;
      light.style.top = `${posY}px`;
      light.style.opacity = (Math.random() * 0.3 + 0.1).toString(); // 0.1-0.4
      
      // Animation with keyframes
      light.animate(
        [
          { transform: 'translateY(0) translateX(0)', opacity: light.style.opacity },
          { transform: `translateY(-${Math.random() * 50 + 30}px) translateX(${Math.random() * 50 - 25}px)`, opacity: (parseFloat(light.style.opacity) * 1.5).toString() },
          { transform: 'translateY(0) translateX(0)', opacity: light.style.opacity }
        ],
        {
          duration: duration * 1000,
          iterations: Infinity
        }
      );
      
      container.appendChild(light);
    }
    
    // Clean up
    return () => {
      const particles = container.querySelectorAll('.particle, .floating-light');
      particles.forEach(particle => particle.remove());
    };
  }, []);
  
  return (
    <div className="login-background">
      <div className="blob-1"></div>
      <div className="blob-2"></div>
      <div className="blob-3"></div>
      <div className="particles-container" ref={containerRef}></div>
    </div>
  );
};

export default LoginBackground;
