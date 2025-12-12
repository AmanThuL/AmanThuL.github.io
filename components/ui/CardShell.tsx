import React from 'react';
import clsx from 'clsx';

interface CardShellProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const CardShell: React.FC<CardShellProps> = ({
  children,
  className = '',
  as: Component = 'div',
}) => {
  return (
    <Component
      className={clsx(
        'bg-bg-900 border border-white/10 relative overflow-hidden',
        'transition-all duration-300',
        className,
      )}
    >
      {children}
    </Component>
  );
};
