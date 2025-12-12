import React from 'react';
import { FileType } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PLACEHOLDER_PATH = '/resume-placeholder.pdf';

export const Resume: React.FC = () => {
  const { language, t } = useLanguage();

  const fallbackText =
    language === 'zh'
      ? '无法加载 PDF 预览，请点击下载按钮打开文件。'
      : 'If the preview fails, use the download button to open the file locally.';

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] bg-[size:32px_32px]" />
        <div className="absolute -left-24 top-10 w-96 h-96 bg-cool-2/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-warm/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(255,42,109,0.04) 0px, rgba(255,42,109,0.04) 14px, transparent 14px, transparent 28px)',
          }}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="relative border border-white/10 bg-bg-900/80 backdrop-blur-xl overflow-hidden pixel-corners">
          <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-[0.06] bg-[size:22px_22px]" />
          <div className="absolute inset-x-0 top-0 h-14 border-b border-white/10 bg-black/60 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-[10px] font-pixel uppercase tracking-[0.3em] text-warm border border-warm/40 bg-warm/10 pixel-corners">
                {t('resume_title')}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400">
                PDF_VIEWPORT
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase">
              <FileType size={14} className="text-cool-2" />
              <span className="text-white">PDF_ACTIVE</span>
            </div>
          </div>
          <div className="pt-14">
            <object data={PLACEHOLDER_PATH} type="application/pdf" className="w-full h-[80vh] bg-bg-900">
              <p className="p-6 text-sm text-gray-400 font-mono">{fallbackText}</p>
            </object>
          </div>
          <div className="absolute inset-0 pointer-events-none border border-warm/20 mix-blend-screen" />
        </div>
      </main>
    </div>
  );
};
