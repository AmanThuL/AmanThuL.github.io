import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Logo } from './Logo';
import { siteConfig } from '../data/siteConfig';

type NavLink = {
  name: string;
  path: string;
  badge?: string;
};

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks: NavLink[] = useMemo(() => {
    const links: NavLink[] = [
      { name: t('nav_projects'), path: '/' },
      { name: t('nav_profile'), path: '/profile' },
    ];

    if (siteConfig.blogVisibility !== 'hidden') {
      links.push({
        name: t('nav_blog'),
        path: '/blog',
        badge: siteConfig.blogVisibility === 'wip' ? 'WIP' : undefined,
      });
    }

    return links;
  }, [t]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== '/' && location.pathname.startsWith(path));

  return (
    <header className="fixed top-0 left-0 w-full bg-bg/90 backdrop-blur-md z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="flex items-center gap-3 group cursor-hover w-16 h-16 -ml-2"
          >
            <div className="w-14 h-14 flex items-center justify-center transition-colors duration-300">
              <Logo
                size={52}
                className="group-hover:opacity-80 transition-opacity"
                variant="default"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-mono font-bold tracking-widest uppercase transition-colors relative py-2 cursor-hover flex items-center gap-2 ${
                  isActive(link.path)
                    ? 'text-white'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {isActive(link.path) && <span className="text-warm mr-1">&gt;</span>}
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-2 py-[2px] text-[10px] font-mono border border-white/20 text-warm bg-warm/5 rounded-sm">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold uppercase text-gray-500 hover:text-white transition-colors cursor-hover border border-white/10 hover:border-white/30"
            >
              <Globe size={14} />
              <span>{language === 'en' ? 'EN' : '中文'}</span>
            </button>

            <Link
              to="/resume"
              className={`px-6 py-2 border text-white font-mono text-xs transition-all duration-300 tracking-widest uppercase cursor-hover ${
                isActive('/resume')
                  ? 'border-warm text-warm bg-warm/10'
                  : 'border-white/20 hover:border-warm hover:text-warm'
              }`}
            >
              [ {t('nav_resume')} ]
            </Link>
          </nav>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-mono font-bold uppercase text-gray-400"
            >
              <Globe size={14} />
              {language.toUpperCase()}
            </button>
            <button
              className="p-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-bg border-b border-white/10 px-4 py-8 shadow-2xl absolute w-full h-screen z-40">
          <nav className="flex flex-col gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-2xl font-pixel text-white uppercase flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                {link.badge && (
                  <span className="px-2 py-1 text-[10px] font-mono border border-white/15 text-warm bg-warm/5 rounded-sm -mt-1">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <Link
              to="/resume"
              className="text-xl font-mono text-warm mt-4 border border-warm/40 px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav_resume')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
