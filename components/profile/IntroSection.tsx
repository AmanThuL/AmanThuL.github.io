import React from 'react';
import { motion } from 'framer-motion';

interface IntroSectionProps {
  heading: string;
  subheading: string;
  philosophy: string;
}

export const IntroSection: React.FC<IntroSectionProps> = ({
  heading,
  subheading,
  philosophy,
}) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
      <div className="lg:col-span-7 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="px-2 py-1 bg-white/10 border border-white/20 text-gray-300 text-[10px] font-pixel uppercase tracking-widest">
              Identity_Log
            </span>
            <div className="h-px w-20 bg-gray-700"></div>
          </div>

          <h1 className="text-4xl md:text-6xl font-pixel text-white mb-6 uppercase leading-tight relative z-20">
            {heading}
          </h1>

          <h2 className="text-xl md:text-2xl font-mono text-cool-1 mb-8 uppercase tracking-wider relative z-20">
            {'// '}{subheading}
          </h2>

          <div className="p-1 border border-white/10 bg-bg-900/50 backdrop-blur-sm relative z-20">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white"></div>

            <p className="p-6 text-gray-300 font-light text-lg leading-relaxed font-sans border-l-2 border-warm pl-6">
              {philosophy}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="lg:col-span-5 flex items-start justify-center lg:justify-end lg:pt-12 relative z-10">
        <div className="relative w-full aspect-square max-w-md">
          <div className="absolute inset-0 border border-white/10 rounded-full animate-spin-slow opacity-30 border-dashed"></div>
          <div className="absolute inset-4 border border-cool-2/20 rounded-full animate-reverse-spin opacity-50"></div>
          <div className="absolute inset-10 bg-bg-900 border border-white/20 overflow-hidden flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700 group">
            <img
              src="https://www.dropbox.com/scl/fi/01kfu45y2eq5nxa408rym/linkedin_profile_photo_20251211_600x600.jpg?rlkey=k2bjgviog9qp7bjrt536uzwts&st=0d5qqc71&raw=1"
              alt="Rudy Zhang"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-0 w-full text-center text-[10px] font-mono text-white/70 uppercase tracking-widest bg-black/50 backdrop-blur-sm py-1">
              Rudy Zhang [User_Admin]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
