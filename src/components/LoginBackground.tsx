
import React, { useEffect, useRef } from 'react';

const LoginBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Call once to initialize
    setCanvasDimensions();
    
    // Update on resize
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle properties
    const particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      alpha: number;
      speed: number;
      direction: number;
    }[] = [];
    
    // Create particles
    function createParticles() {
      const particleCount = Math.min(Math.floor(window.innerWidth / 20), 50);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: `hsl(210, 100%, 50%, ${Math.random() * 0.3 + 0.1})`,
          alpha: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.2 + 0.1,
          direction: Math.random() * Math.PI * 2
        });
      }
    }
    
    // Draw particles
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        // Move particles
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        
        // Change direction slightly
        particle.direction += (Math.random() - 0.5) * 0.01;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Connect particles that are close to each other
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(210, 230, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
    }
    
    // Animation loop
    let animationId: number;
    
    function animate() {
      drawParticles();
      animationId = requestAnimationFrame(animate);
    }
    
    createParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 bg-gradient-to-br from-background to-secondary"
    />
  );
};

export default LoginBackground;
