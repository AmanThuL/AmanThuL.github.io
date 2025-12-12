import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, Database, Github, Globe, Instagram, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ContactGrid, SocialLink } from './ContactGrid';

export const HeroSection: React.FC = () => {
  const { language, t } = useLanguage();

  const socialLinks: SocialLink[] = [
    { icon: <Github size={18} />, href: 'https://github.com', label: 'GitHub', colorClass: 'hover:text-white' },
    { icon: <Linkedin size={18} />, href: 'https://linkedin.com', label: 'LinkedIn', colorClass: 'hover:text-cool-1' },
    { icon: <Mail size={18} />, href: 'mailto:email@example.com', label: 'Email', colorClass: 'hover:text-warm' },
    { icon: <Instagram size={18} />, href: 'https://instagram.com', label: 'Instagram', colorClass: 'hover:text-cool-2' },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-2 py-1 bg-warm/10 border border-warm text-warm text-[10px] font-pixel uppercase tracking-widest">
                System Online
              </span>
              <div className="h-px w-20 bg-warm/50"></div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tighter mb-8 font-pixel">
              RUDY<span className="text-dim">_</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                ZHANG
              </span>
            </h1>

            <div className="flex flex-col md:flex-row gap-6 md:items-center text-sm font-mono text-gray-400 mb-10">
              <span className="flex items-center gap-2">
                <Cpu size={14} className="text-cool-2" /> {t('hero_role_gpu')}
              </span>
              <span className="hidden md:block text-dim">|</span>
              <span className="flex items-center gap-2">
                <Database size={14} className="text-cool-1" /> {t('hero_role_research')}
              </span>
              <span className="hidden md:block text-dim">|</span>
              <span className="flex items-center gap-2">
                <Globe size={14} className="text-warm" /> {t('hero_role_game')}
              </span>
            </div>

            <p className="max-w-xl text-lg text-gray-300 font-light leading-relaxed mb-10 border-l-2 border-dim pl-6">
              {language === 'zh'
                ? '构建高性能渲染管线和沉浸式交互系统。融合技术精度与创意视野。'
                : (
                  <>
                    Architecting high-performance rendering pipelines and immersive interactive systems.
                    <span className="text-cool-1 font-medium"> Blending </span><span className="text-cool-2 font-medium">technical precision</span> with{' '}
                    <span className="text-warm font-medium">creative vision</span>.
                  </>
                )}
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactGrid links={socialLinks} />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
          {t('hero_scroll')}
        </span>
        <ArrowDown size={14} className="text-white" />
      </div>
    </section>
  );
};
