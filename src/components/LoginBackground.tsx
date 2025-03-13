
import React, { useEffect, useRef } from 'react';
import '../styles/login.css';

const LoginBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create particles
    const particlesCount = 80; // Increased particle count
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
    const lightsCount = 8;
    for (let i = 0; i < lightsCount; i++) {
      const light = document.createElement('div');
      light.classList.add('floating-light');
      
      const size = Math.random() * 300 + 100; // 100-400px
      const posX = Math.random() * containerRect.width;
      const posY = Math.random() * containerRect.height;
      const duration = Math.random() * 40 + 30; // 30-70s
      
      light.style.width = `${size}px`;
      light.style.height = `${size}px`;
      light.style.left = `${posX}px`;
      light.style.top = `${posY}px`;
      light.style.opacity = (Math.random() * 0.4 + 0.1).toString(); // 0.1-0.5
      
      // Unique colors for lights
      const hue = Math.floor(Math.random() * 60) + 190; // Blue-ish hues
      light.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 70%, 0.4) 0%, hsla(${hue}, 100%, 60%, 0) 70%)`;
      
      // Animation with keyframes
      light.animate(
        [
          { transform: 'translateY(0) translateX(0)', opacity: light.style.opacity },
          { transform: `translateY(-${Math.random() * 80 + 30}px) translateX(${Math.random() * 80 - 40}px)`, opacity: (parseFloat(light.style.opacity) * 1.5).toString() },
          { transform: 'translateY(0) translateX(0)', opacity: light.style.opacity }
        ],
        {
          duration: duration * 1000,
          iterations: Infinity
        }
      );
      
      container.appendChild(light);
    }
    
    // Add decorative elements
    const decorElements = 4;
    for (let i = 0; i < decorElements; i++) {
      const decor = document.createElement('div');
      decor.classList.add('background-decor');
      
      const size = Math.random() * 120 + 40; // 40-160px
      const posX = Math.random() * containerRect.width;
      const posY = Math.random() * containerRect.height;
      const rotation = Math.random() * 360;
      const duration = Math.random() * 20 + 20; // 20-40s
      
      decor.style.width = `${size}px`;
      decor.style.height = `${size}px`;
      decor.style.left = `${posX}px`;
      decor.style.top = `${posY}px`;
      decor.style.transform = `rotate(${rotation}deg)`;
      decor.style.opacity = (Math.random() * 0.15 + 0.05).toString(); // 0.05-0.2
      
      // Animation
      decor.animate(
        [
          { transform: `rotate(${rotation}deg)` },
          { transform: `rotate(${rotation + 20}deg)` },
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
