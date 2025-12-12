import React from 'react';
import { CardShell } from '../ui/CardShell';

export interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
  colorClass?: string;
}

interface ContactGridProps {
  links: SocialLink[];
}

export const ContactGrid: React.FC<ContactGridProps> = ({ links }) => {
  return (
    <CardShell className="p-1 relative group">
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-warm"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-warm"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-warm"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-warm"></div>

      <div className="bg-bg-800 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-50">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-warm rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-cool-1 rounded-full animate-pulse delay-75"></div>
            <div className="w-1 h-1 bg-cool-2 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>

        <h3 className="font-pixel text-lg text-white mb-6 uppercase">Communication<br/>Uplink_</h3>

        <div className="grid grid-cols-2 gap-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={`flex flex-col items-center justify-center p-4 bg-bg-900 border border-white/5 hover:border-warm/50 transition-all group/link cursor-hover ${link.colorClass ?? ''}`}
            >
              <div className="mb-2 opacity-70 group-hover/link:opacity-100 transition-opacity">
                {link.icon}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </CardShell>
  );
};
