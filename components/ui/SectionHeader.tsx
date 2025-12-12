import React from 'react';

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  subtitleClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = '',
  subtitleClassName = '',
}) => {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div>
        <h2 className="text-3xl md:text-4xl font-pixel text-white mb-2">{title}</h2>
        {subtitle ? (
          <p
            className={`font-mono text-xs uppercase tracking-[0.2em] ${subtitleClassName}`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
};
