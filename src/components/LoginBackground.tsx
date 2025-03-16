
import React, { useEffect, useRef } from 'react';
import '../styles/login.css';

const LoginBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create particles - reduced count for better performance
    const particlesCount = 40; // Reduced from 80 to 40
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
      const size = Math.random() * 6 + 2; // Reduced from 8+2 to 6+2
      const posX = Math.random() * containerRect.width;
      const posY = Math.random() * containerRect.height;
      const duration = Math.random() * 20 + 15; // Reduced from 30+15 to 20+15
      const delay = Math.random() * 5; // Reduced from 8 to 5
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString(); // Reduced from 0.7+0.2 to 0.5+0.2
      
      // Animation with keyframes
      particle.animate(
        [
          { transform: 'translateY(0) rotate(0deg)', opacity: particle.style.opacity },
          { transform: `translateY(-${Math.random() * 100 + 60}px) rotate(${Math.random() * 180}deg)`, opacity: '0' } // Reduced y movement from 150+80 to 100+60 and rotation from 360 to 180
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          iterations: Infinity
        }
      );
      
      container.appendChild(particle);
    }
    
    // Add floating light effects - reduced for better performance
    const lightsCount = 4; // Reduced from 8 to 4
    for (let i = 0; i < lightsCount; i++) {
      const light = document.createElement('div');
      light.classList.add('floating-light');
      
      const size = Math.random() * 200 + 100; // Reduced from 300+100 to 200+100
      const posX = Math.random() * containerRect.width;
      const posY = Math.random() * containerRect.height;
      const duration = Math.random() * 30 + 30; // Reduced from 40+30 to 30+30
      
      light.style.width = `${size}px`;
      light.style.height = `${size}px`;
      light.style.left = `${posX}px`;
      light.style.top = `${posY}px`;
      light.style.opacity = (Math.random() * 0.3 + 0.1).toString(); // Reduced from 0.4+0.1 to 0.3+0.1
      
      // Unique colors for lights
      const hue = Math.floor(Math.random() * 60) + 190; // Blue-ish hues
      light.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 70%, 0.3) 0%, hsla(${hue}, 100%, 60%, 0) 70%)`; // Reduced opacity from 0.4 to 0.3
      
      // Animation with keyframes - simplified movement
      light.animate(
        [
          { transform: 'translateY(0) translateX(0)', opacity: light.style.opacity },
          { transform: `translateY(-${Math.random() * 40 + 20}px) translateX(${Math.random() * 40 - 20}px)`, opacity: (parseFloat(light.style.opacity) * 1.3).toString() }, // Reduced y movement from 80+30 to 40+20, x movement from 80-40 to 40-20, and opacity multiplier from 1.5 to 1.3
          { transform: 'translateY(0) translateX(0)', opacity: light.style.opacity }
        ],
        {
          duration: duration * 1000,
          iterations: Infinity
        }
      );
      
      container.appendChild(light);
    }
    
    // Add decorative elements - reduced for better performance
    const decorElements = 2; // Reduced from 4 to 2
    for (let i = 0; i < decorElements; i++) {
      const decor = document.createElement('div');
      decor.classList.add('background-decor');
      
      const size = Math.random() * 100 + 40; // Reduced from 120+40 to 100+40
      const posX = Math.random() * containerRect.width;
      const posY = Math.random() * containerRect.height;
      const rotation = Math.random() * 360;
      const duration = Math.random() * 15 + 20; // Reduced from 20+20 to 15+20
      
      decor.style.width = `${size}px`;
      decor.style.height = `${size}px`;
      decor.style.left = `${posX}px`;
      decor.style.top = `${posY}px`;
      decor.style.transform = `rotate(${rotation}deg)`;
      decor.style.opacity = (Math.random() * 0.1 + 0.05).toString(); // Reduced from 0.15+0.05 to 0.1+0.05
      
      // Animation - reduced rotation
      decor.animate(
        [
          { transform: `rotate(${rotation}deg)` },
          { transform: `rotate(${rotation + 10}deg)` }, // Reduced rotation from 20 to 10
          { transform: `rotate(${rotation}deg)` }
        ],
        {
          duration: duration * 1000,
          iterations: Infinity
        }
      );
      
      container.appendChild(decor);
    }
    
    // Clean up
    return () => {
      const elements = container.querySelectorAll('.particle, .floating-light, .background-decor');
      elements.forEach(element => element.remove());
    };
  }, []);
  
  return (
    <div className="login-background">
      <div className="blob-1"></div>
      <div className="blob-2"></div>
      <div className="blob-3"></div>
      <div className="blob-4"></div>
      <div className="gradient-overlay"></div>
      <div className="particles-container" ref={containerRef}></div>
    </div>
  );
};

export default LoginBackground;
