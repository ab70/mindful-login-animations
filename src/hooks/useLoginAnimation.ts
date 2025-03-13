
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

export const useSequentialAnimation = (
  items: number,
  baseDelay: number = 100,
  initialDelay: number = 300
) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(items).fill(false));
  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < items; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
      }, initialDelay + i * baseDelay);
      
      timers.push(timer);
    }
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [items, baseDelay, initialDelay]);
  
  return { visibleItems };
};

export default useLoginAnimation;
