
import React, { useEffect, useRef } from 'react';
import { SafetyCertificateFilled, LockFilled } from '@ant-design/icons';
import '../styles/login.css';

const AnimatedLogo = () => {
  const logoRef = useRef(null);
  
  useEffect(() => {
    if (!logoRef.current) return;
    
    // Add glow effect animation
    const logo = logoRef.current;
    
    // Create a glow element
    const glow = document.createElement('div');
    glow.classList.add('logo-glow');
    logo.appendChild(glow);
    
    // Create particles for the logo
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.classList.add('logo-particle');
      
      const size = Math.random() * 6 + 2;
      const posX = Math.random() * 100 - 50;
      const posY = Math.random() * 100 - 50;
      const delay = Math.random() * 2;
      const duration = Math.random() * 3 + 2;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `calc(50% + ${posX}px)`;
      particle.style.top = `calc(50% + ${posY}px)`;
      
      // Animation
      particle.animate(
        [
          { 
            transform: 'scale(0)', 
            opacity: '0.7',
            boxShadow: '0 0 10px rgba(82, 191, 203, 0.7)'
          },
          { 
            transform: 'scale(1)', 
            opacity: '0',
            boxShadow: '0 0 0 rgba(82, 191, 203, 0)'
          }
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          iterations: Infinity
        }
      );
      
      logo.appendChild(particle);
    }
    
    return () => {
      const particles = logo.querySelectorAll('.logo-particle, .logo-glow');
      particles.forEach(particle => particle.remove());
    };
  }, []);
  
  return (
    <div className="login-logo-wrapper" ref={logoRef}>
      <div className="login-logo-icon">
        <SafetyCertificateFilled 
          style={{ 
            fontSize: 36, 
            color: '#52bfcb',
            position: 'relative',
            zIndex: 2,
          }} 
        />
        <LockFilled 
          style={{ 
            fontSize: 18, 
            color: '#fff',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
          }} 
        />
      </div>
      <div className="login-logo-text">
        <h1>SecureID</h1>
        <p>Identity Management</p>
      </div>
      
      <style>
        {`
        .login-logo-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
        }
        
        .login-logo-icon {
          position: relative;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 3s infinite;
        }
        
        .login-logo-text h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(90deg, #52bfcb, #7ce0eb);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .login-logo-text p {
          margin: 0;
          font-size: 12px;
          color: #666;
        }
        
        .logo-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(82, 191, 203, 0.4) 0%, rgba(82, 191, 203, 0) 70%);
          animation: glowPulse 2s infinite;
        }
        
        .logo-particle {
          position: absolute;
          background: #52bfcb;
          border-radius: 50%;
          z-index: 1;
        }
      `}
      </style>
    </div>
  );
};

export default AnimatedLogo;
