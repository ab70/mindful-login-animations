
import { useState, useEffect } from 'react';

const useLoginAnimation = ({ delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);
  
  return { isVisible };
};

export default useLoginAnimation;
