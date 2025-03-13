
import { useState, useEffect } from 'react';

export const useLoginAnimation = (delay: number = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return { isVisible };
};

export default useLoginAnimation;
