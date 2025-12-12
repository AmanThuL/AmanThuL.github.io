import React, { useState } from 'react';

type LogoVariant = 'default' | 'light';

interface LogoProps {
  size?: number;
  className?: string;
  variant?: LogoVariant;
  title?: string;
  hoverEffect?: boolean;
}

const baseLogoSources: Record<LogoVariant, string> = {
  default: '/brand/rz-logo-v2-light-512.svg',
  light: '/brand/rz-logo-v2-light-512.svg',
};

const hoverLogoSources: Record<LogoVariant, string> = {
  default: '/brand/rz-logo-v2-light-hover-512.svg',
  light: '/brand/rz-logo-v2-light-hover-512.svg',
};

export const Logo: React.FC<LogoProps> = ({
  size = 40,
  className = '',
  variant = 'default',
  title = 'Rudy Zhang logo',
  hoverEffect = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const baseSrc = baseLogoSources[variant] ?? baseLogoSources.default;
  const hoverSrc = hoverLogoSources[variant] ?? hoverLogoSources.default;

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden group ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={baseSrc}
        width={size}
        height={size}
        alt={title}
        className="relative z-10 transition-transform duration-500 group-hover:saturate-150"
        loading="lazy"
      />
      {hoverEffect && (
        <img
          src={hoverSrc}
          width={size}
          height={size}
          alt={title}
          className={`absolute inset-0 z-20 logo-overlay ${
            isHovered ? 'logo-reveal' : 'logo-hide'
          }`}
          loading="lazy"
        />
      )}
    </div>
  );
};
