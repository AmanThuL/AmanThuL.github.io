
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LOADER_TEXTS = [
  'LOADING_ASSETS...',
  'COMPILING_SHADERS...',
  'ALLOCATING_VRAM...',
  'CONNECTING_TO_GPU...',
  'SYSTEM_READY',
] as const;

export const PageLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [loadingText, setLoadingText] = useState('INITIALIZING...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let textIndex = 0;
    let completed = false;

    // Cycle text
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % LOADER_TEXTS.length;
      setLoadingText(LOADER_TEXTS[textIndex]);
    }, 400);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.random() * 10, 100);

        if (!completed && next >= 100) {
          completed = true;
          clearInterval(textInterval);
          clearInterval(progressInterval);
          setTimeout(onComplete, 500); // Slight delay after 100%
        }

        return next;
      });
    }, 150);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-bg flex items-center justify-center flex-col"
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-80 md:w-96 relative">
        <div className="flex justify-between mb-2 font-mono text-xs tracking-widest uppercase">
          <span className="text-cool-1 animate-pulse">{loadingText}</span>
          <span className="text-white">{Math.floor(progress)}%</span>
        </div>

        {/* Progress Container */}
        <div className="h-4 w-full bg-bg-900 border border-gray-700 relative overflow-hidden p-[2px]">
          {/* Background Grid inside bar */}
          <div className="absolute inset-0 opacity-20"
             style={{backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.1) 50%)', backgroundSize: '4px 4px'}}>
          </div>

          {/* Fill Bar */}
          <motion.div
            className="h-full bg-gradient-to-r from-cool-2 via-cool-1 to-white relative"
            style={{ width: `${progress}%` }}
          >
             {/* Glow effect on the leading edge */}
             <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[2px] opacity-70"></div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="mt-2 flex justify-between text-[10px] text-gray-600 font-mono">
           <span>MEM_ADDR: 0x8F44A</span>
        </div>

        <div className="absolute -left-4 top-1/2 w-2 h-16 border-l border-t border-b border-gray-700 -translate-y-1/2"></div>
        <div className="absolute -right-4 top-1/2 w-2 h-16 border-r border-t border-b border-gray-700 -translate-y-1/2"></div>
      </div>
    </motion.div>
  );
};
