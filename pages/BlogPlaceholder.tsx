import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const BlogPlaceholder: React.FC = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute -left-20 top-10 w-80 h-80 bg-cool-2/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-warm/10 blur-[120px]" />
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-10 md:p-12 shadow-2xl">
          <p className="text-[10px] font-pixel uppercase tracking-[0.3em] text-warm mb-4">
            {isZh ? '系统提示' : 'System Notice'}
          </p>
          <h1 className="text-4xl md:text-5xl font-pixel text-white uppercase tracking-tight mb-4">
            {isZh ? '博客建设中' : 'Blog Under Construction'}
          </h1>
          <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-3xl border-l-2 border-cool-2 pl-4">
            {isZh
              ? '我正在完善记录与文章的内容。在此期间，博客入口保持占位状态，敬请期待。'
              : 'I am still polishing the write-ups and breakdowns. For now the blog stays in placeholder mode while the rest of the site is ready.'}
          </p>

          <div className="flex flex-wrap gap-3 mt-10">
            <Link
              to="/"
              className="px-6 py-3 border border-white/15 hover:border-cool-2 hover:bg-cool-2/10 text-xs font-mono font-bold uppercase tracking-[0.2em] text-white transition-all cursor-hover"
            >
              {isZh ? '返回项目' : 'Back to Projects'}
            </Link>
            <Link
              to="/resume"
              className="px-6 py-3 border border-white/15 hover:border-warm/80 hover:bg-warm/10 text-xs font-mono font-bold uppercase tracking-[0.2em] text-warm transition-all cursor-hover"
            >
              {isZh ? '查看简历' : 'View Resume'}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
