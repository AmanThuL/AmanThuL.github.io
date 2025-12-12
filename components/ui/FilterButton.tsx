import React from 'react';
import clsx from 'clsx';

type FilterVariant = 'neutral' | 'accent';

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: FilterVariant;
  type?: 'button' | 'submit';
}

const variantClasses: Record<FilterVariant, { active: string; inactive: string }> = {
  neutral: {
    active: 'bg-white text-black border-white',
    inactive:
      'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white',
  },
  accent: {
    active: 'bg-cool-2 text-white border-cool-2',
    inactive:
      'bg-bg-900 text-gray-500 border-white/10 hover:border-cool-2 hover:text-white',
  },
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  active,
  onClick,
  children,
  className = '',
  variant = 'neutral',
  type = 'button',
}) => {
  const styles = variantClasses[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-hover',
        active ? styles.active : styles.inactive,
        className,
      )}
    >
      {children}
    </button>
  );
};
