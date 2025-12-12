import React from 'react';

interface TagPillProps {
  label: string;
  className?: string;
}

export const TagPill: React.FC<TagPillProps> = ({ label, className = '' }) => {
  return (
    <span
      className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 border border-white/10 text-gray-400 ${className}`}
    >
      {label}
    </span>
  );
};
