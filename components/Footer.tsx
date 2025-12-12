import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-bg-900 border-t border-white/5 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
          <span className="w-2 h-2 bg-green-500 rounded-none animate-pulse"></span>
          {t('footer_system')}
        </div>
        <div className="text-[10px] text-gray-600 font-mono uppercase text-center md:text-right">
          {t('footer_credit')}
        </div>
      </div>
    </footer>
  );
};
