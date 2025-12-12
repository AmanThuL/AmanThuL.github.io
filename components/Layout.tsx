import React, { ReactNode } from 'react';
import { ParticleBackground } from './ParticleBackground';
import { CustomCursor } from './CustomCursor';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-gray-100 relative selection:bg-warm selection:text-black overflow-x-hidden">
      <ParticleBackground />
      <CustomCursor />
      <Header />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
    </div>
  );
};
