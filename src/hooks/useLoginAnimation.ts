
import { useState, useEffect } from 'react';

export interface LoginAnimationOptions {
  delay?: number;
  duration?: number;
  type?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale';
}

export const useLoginAnimation = (options: LoginAnimationOptions = {}) => {
  const { 
    delay = 0, 
    duration = 300, // Reduced from 500 to 300
    type = 'fade'
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Set animation class based on type using our CSS classes, not Tailwind
      switch (type) {
        case 'fade':
          setAnimationClass('animate-fade');
          break;
        case 'slide-up':
          setAnimationClass('animate-slide-up');
          break;
        case 'slide-down':
          setAnimationClass('animate-slide-down');
          break;
        case 'slide-left':
          setAnimationClass('animate-slide-left');
          break;
        case 'slide-right':
          setAnimationClass('animate-slide-right');
          break;
        case 'scale':
          setAnimationClass('animate-scale');
          break;
        default:
          setAnimationClass('animate-fade');
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay, duration, type]);
  
  return { isVisible, animationClass };
};

export default useLoginAnimation;
