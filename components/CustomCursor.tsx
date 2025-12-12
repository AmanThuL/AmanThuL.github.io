import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Hide on mobile/touch devices
  if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-exclusion hidden md:block">
      <motion.div
        className="absolute bg-white"
        animate={{
          x: mousePosition.x - (isHovering ? 8 : 4),
          y: mousePosition.y - (isHovering ? 8 : 4),
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          width: isHovering ? 16 : 8,
          height: isHovering ? 16 : 8,
          borderRadius: 0, // Solid square
        }}
        transition={{
          type: 'spring',
          stiffness: 1500,
          damping: 25,
          mass: 0.2
        }}
      />
      {/* Optional Tag or Data Label near cursor */}
      <motion.div
         className="absolute top-4 left-4 text-[8px] font-mono text-warm font-bold uppercase tracking-widest whitespace-nowrap"
         animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            opacity: isHovering ? 1 : 0
         }}
      >
         ACCESS
      </motion.div>
    </div>
  );
};