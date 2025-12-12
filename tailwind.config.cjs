/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './App.tsx',
    './routes.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './contexts/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#08090A',
          900: '#111316',
          800: '#1A1D23',
        },
        warm: {
          DEFAULT: '#FF2A6D',
          hover: '#FF6B9B',
        },
        cool: {
          1: '#05D9E8',
          2: '#6366F1',
        },
        dim: '#4B5563',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        pixel: ['Silkscreen', 'cursive'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glitch: 'glitch 1s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'reverse-spin': 'reverse-spin 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'reverse-spin': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, #1A1D23 1px, transparent 1px), linear-gradient(to bottom, #1A1D23 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
