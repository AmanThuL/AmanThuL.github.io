import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getProjects } from '../data/projects';
import { ArrowLeft, ExternalLink, Calendar, Users, Target, MapPin, List, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { RichText } from '../components/RichText';
import { CardShell } from '../components/ui/CardShell';
import { ProjectDetails, ProjectTheme } from '../types';

type TocItem = {
  id: string;
  label: string;
};

type LongFormBlock = ProjectDetails['longFormContent'][number];

type LongFormSection = {
  id: string;
  title: string;
  blocks: LongFormBlock[];
};

const EMPTY_LONG_FORM_CONTENT: LongFormBlock[] = [];

const THEME_STYLES: Record<ProjectTheme, { accentText: string; accentBorder: string; accentBg: string; accentBgSoft: string }> = {
  hero_role_gpu: {
    accentText: 'text-cool-2',
    accentBorder: 'border-cool-2/30',
    accentBg: 'bg-cool-2',
    accentBgSoft: 'bg-cool-2/10',
  },
  hero_role_research: {
    accentText: 'text-cool-1',
    accentBorder: 'border-cool-1/30',
    accentBg: 'bg-cool-1',
    accentBgSoft: 'bg-cool-1/10',
  },
  hero_role_game: {
    accentText: 'text-warm',
    accentBorder: 'border-warm/30',
    accentBg: 'bg-warm',
    accentBgSoft: 'bg-warm/10',
  },
};

const isProbablyUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return (
    /^https?:\/\//i.test(trimmed) ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('data:')
  );
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollTocContainerToActive = (container: HTMLElement, active: HTMLElement) => {
  if (container.clientHeight <= 0) return;

  const maxScrollTop = container.scrollHeight - container.clientHeight;
  if (maxScrollTop <= 1) return;

  const containerRect = container.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();

  const activeTop = activeRect.top - containerRect.top + container.scrollTop;
  const activeBottom = activeRect.bottom - containerRect.top + container.scrollTop;

  const padding = 12;
  const viewTop = container.scrollTop;
  const viewBottom = viewTop + container.clientHeight;

  let nextScrollTop: number | null = null;
  if (activeTop < viewTop + padding) {
    nextScrollTop = activeTop - padding;
  } else if (activeBottom > viewBottom - padding) {
    nextScrollTop = activeBottom - container.clientHeight + padding;
  }

  if (nextScrollTop === null) return;
  const clamped = Math.max(0, Math.min(maxScrollTop, nextScrollTop));
  if (Math.abs(clamped - container.scrollTop) < 1) return;

  container.scrollTo({
    top: clamped,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
};

const toStableSectionId = (prefix: string, index: number, title: string) => {
  const normalized = title
    .toLowerCase()
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return `${prefix}-${String(index).padStart(2, '0')}-${normalized || 'section'}`;
};

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  
  const projects = getProjects(language);
  const project = projects.find((p) => p.slug === slug);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('overview');
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const desktopTocScrollRef = useRef<HTMLDivElement | null>(null);
  const mobileTocScrollRef = useRef<HTMLDivElement | null>(null);
  const mobileTocBarRef = useRef<HTMLDivElement | null>(null);
  const longFormContent = project?.details.longFormContent ?? EMPTY_LONG_FORM_CONTENT;

  const longFormSections: LongFormSection[] = useMemo(() => {
    const sections: LongFormSection[] = [];
    let currentSection: LongFormSection | null = null;
    let sectionCount = 0;

    longFormContent.forEach((block) => {
      if (block.type === 'heading') {
        sectionCount += 1;
        const id = toStableSectionId('section', sectionCount, block.content);
        currentSection = { id, title: block.content, blocks: [] };
        sections.push(currentSection);
        return;
      }

      if (!currentSection) {
        sectionCount += 1;
        currentSection = {
          id: toStableSectionId('section', sectionCount, 'details'),
          title: 'Details',
          blocks: [],
        };
        sections.push(currentSection);
      }

      currentSection.blocks.push(block);
    });

    return sections;
  }, [longFormContent]);

  const tocItems: TocItem[] = useMemo(
    () => [
      { id: 'media', label: t('project_media') },
      { id: 'overview', label: t('project_overview') },
      { id: 'contributions', label: t('project_contributions') },
      ...longFormSections.map((section) => ({ id: section.id, label: section.title })),
    ],
    [longFormSections, t],
  );

  const tocLabelById = useMemo(() => {
    const map = new Map<string, string>();
    tocItems.forEach((item) => map.set(item.id, item.label));
    return map;
  }, [tocItems]);

  useEffect(() => {
    setActiveMediaIndex(0);
    setActiveSectionId(tocItems[0]?.id ?? 'overview');
    setIsMobileTocOpen(false);
  }, [slug, language, tocItems]);

  useEffect(() => {
    if (!tocItems.length) return;

    let rafId: number | null = null;

    const updateActiveFromScroll = () => {
      rafId = null;
      const headerHeight = 80;
      const tocBarHeight = mobileTocBarRef.current?.getBoundingClientRect().height ?? 0;
      const offset = headerHeight + tocBarHeight + 16;

      let nextActiveId = tocItems[0]?.id ?? 'overview';

      for (const item of tocItems) {
        const element = document.getElementById(item.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= offset) nextActiveId = item.id;
        else break;
      }

      setActiveSectionId((prev) => (prev === nextActiveId ? prev : nextActiveId));
    };

    const requestUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateActiveFromScroll);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [tocItems]);

  useEffect(() => {
    const container = desktopTocScrollRef.current;
    if (!container) return;
    const active = container.querySelector<HTMLElement>(`[data-toc-id="${activeSectionId}"]`);
    if (!active) return;
    scrollTocContainerToActive(container, active);
  }, [activeSectionId]);

  useEffect(() => {
    if (!isMobileTocOpen) return;
    const container = mobileTocScrollRef.current;
    if (!container) return;
    const active = container.querySelector<HTMLElement>(`[data-toc-id="${activeSectionId}"]`);
    if (!active) return;
    scrollTocContainerToActive(container, active);
  }, [activeSectionId, isMobileTocOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  };

  const handleTocSelect = (id: string) => {
    setIsMobileTocOpen(false);
    scrollToSection(id);
  };

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const { details } = project;
  const theme = THEME_STYLES[project.theme];
  const roleLines = (Array.isArray(details.role) ? details.role : details.role.split('\n'))
    .map((line) => line.trim())
    .filter(Boolean);
  const roleLabel = roleLines.length > 1 ? t('project_roles') : t('project_role');

  const media = project.gallery.length > 0 ? project.gallery : [project.thumbnail].filter(Boolean);
  const activeMediaSrc = media[Math.min(activeMediaIndex, Math.max(media.length - 1, 0))];

  const renderLongFormMedia = (block: LongFormBlock, idx: number) => {
    if (block.type === 'image') {
      const looksLikeImageSrc = isProbablyUrl(block.content) && !/^mailto:/i.test(block.content.trim());

      return (
        <figure key={`img-${idx}`} className="w-full">
          {looksLikeImageSrc ? (
            <div className="border border-white/10 p-1 bg-black/40 relative overflow-hidden group">
              <div className={`absolute inset-0 ${theme.accentBg} opacity-0 group-hover:opacity-[0.08] transition-opacity pointer-events-none`}></div>
              <img src={block.content} alt={block.caption || project.title} className="w-full h-auto grayscale-[15%] group-hover:grayscale-0 transition-all" />
            </div>
          ) : (
            <div className="border border-white/10 bg-bg-900/60 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] tech-grid pointer-events-none"></div>
              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
                    VISUAL_ASSET_UNAVAILABLE
                  </div>
                  <div className={`text-[10px] font-pixel ${theme.accentText} opacity-80`}>IMG_{String(idx).padStart(2, '0')}</div>
                </div>
                <div className="text-gray-300 font-light leading-relaxed">
                  <RichText text={block.content} variant="block" />
                </div>
              </div>
            </div>
          )}

          {block.caption ? (
            <figcaption className="mt-3 text-xs font-mono text-gray-500 uppercase tracking-widest text-right">
              Fig_{idx}. <RichText text={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      );
    }

    if (block.type === 'video') {
      const looksLikeVideoSrc = isProbablyUrl(block.content) && !/^mailto:/i.test(block.content.trim());
      const isMp4 = /\.mp4(\?|$)/i.test(block.content.trim());
      const isYouTube = /(?:youtube\.com|youtu\.be)/i.test(block.content.trim());

      return (
        <div key={`vid-${idx}`} className="w-full">
	          {looksLikeVideoSrc && isMp4 ? (
	            <div className="border border-white/10 p-1 bg-black/40">
	              <video controls className="w-full h-auto">
	                <source src={block.content} />
	                <track kind="captions" />
	              </video>
	            </div>
	          ) : looksLikeVideoSrc && isYouTube ? (
            <div className="border border-white/10 bg-black/40 aspect-video overflow-hidden">
              <iframe
                className="w-full h-full"
                src={block.content}
                title={block.caption || project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="border border-white/10 bg-bg-900/60 p-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500 mb-3">
                VIDEO_ASSET_UNAVAILABLE
              </div>
              <div className="text-gray-300 font-light">
                <RichText text={block.content} variant="block" />
              </div>
            </div>
          )}

          {block.caption ? (
            <div className="mt-3 text-xs font-mono text-gray-500 uppercase tracking-widest text-right">
              <RichText text={block.caption} />
            </div>
          ) : null}
        </div>
      );
    }

    if (block.type === 'text') {
      return (
        <div key={`txt-${idx}`} className="text-gray-300 text-lg font-light leading-relaxed max-w-3xl">
          <RichText text={block.content} variant="block" />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-bg relative">
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern tech-grid opacity-[0.08] z-0"></div>
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-bg/60 to-bg z-0"></div>

      <article className="pt-24 pb-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-warm transition-colors cursor-hover"
          >
            <ArrowLeft size={14} /> {t('back_home')}
          </Link>
          <div className={`text-[10px] font-pixel ${theme.accentText} opacity-90`}>
            ID: {project.id.padStart(4, '0')} {'// ACCESS_GRANTED'}
          </div>
        </div>

        {/* Header Content */}
        <header className="mb-16">
          <div className="flex flex-wrap gap-3 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono font-bold uppercase tracking-wider ${theme.accentText}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-pixel text-white mb-6 uppercase leading-none break-words">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
            <span className={`flex items-center gap-2 ${theme.accentText}`}>
              <span className={`w-2 h-2 ${theme.accentBg} opacity-80`}></span>
              {'//'} DOSSIER_SYNCED
            </span>
            {details.timeline ? (
              <span className="flex items-center gap-2">
                <Calendar size={12} /> {details.timeline}
              </span>
            ) : null}
            {details.location ? (
              <span className="flex items-center gap-2">
                <MapPin size={12} /> {details.location}
              </span>
            ) : null}
          </div>

          <div className={`h-1 w-24 ${theme.accentBg} mb-10 mt-10`}></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Data Log */}
            <aside className="order-2 lg:order-1 lg:col-span-3">
              <div className="lg:sticky lg:top-24 space-y-6">
                <CardShell className="p-6 bg-bg-900/50 backdrop-blur-sm">
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 mb-2 uppercase text-[10px] font-mono tracking-widest">
                        <Target size={12} /> {roleLabel}
                      </div>
                      <div className="text-white font-sans font-medium space-y-1">
                        {roleLines.map((line, idx) => (
                          <div key={idx}>
                            <RichText text={line} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-gray-500 mb-2 uppercase text-[10px] font-mono tracking-widest">
                        <Calendar size={12} /> {t('project_timeline')}
                      </div>
                      <div className="text-white font-sans font-medium">{details.timeline}</div>
                    </div>

                    {details.location ? (
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 mb-2 uppercase text-[10px] font-mono tracking-widest">
                          <MapPin size={12} /> LOCATION
                        </div>
                        <div className="text-white font-sans font-medium">{details.location}</div>
                      </div>
                    ) : null}

                    <div>
                      <div className="flex items-center gap-2 text-gray-500 mb-2 uppercase text-[10px] font-mono tracking-widest">
                        <Users size={12} /> {t('project_team')}
                      </div>
                      <div className="text-white font-sans text-sm">
                        {details.team.map((member, i) => (
                          <div key={i}>{member}</div>
                        ))}
                      </div>
                    </div>

                    {details.assetLinks.length > 0 ? (
                      <div className="pt-6 border-t border-white/10">
                        {details.assetLinks.map((link, i) => {
                          const clickable = isProbablyUrl(link.url) && !/^mailto:/i.test(link.url.trim());
                          const external = /^https?:\/\//i.test(link.url.trim());

                          return clickable ? (
                            <a
                              key={`${link.label}-${i}`}
                              href={link.url}
                              target={external ? '_blank' : undefined}
                              rel={external ? 'noreferrer' : undefined}
                              className={`flex items-center justify-between w-full p-2 mb-2 ${theme.accentBgSoft} border ${theme.accentBorder} ${theme.accentText} hover:bg-white hover:text-black transition-all text-xs font-mono uppercase tracking-wider cursor-hover`}
                            >
                              {link.label} <ExternalLink size={12} />
                            </a>
                          ) : (
                            <div
                              key={`${link.label}-${i}`}
                              className="flex items-center justify-between w-full p-2 mb-2 bg-white/5 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-wider"
                            >
                              <span className="truncate">{link.label}</span>
                              <span className="text-[10px] text-gray-600 ml-3 whitespace-nowrap">
                                UNAVAILABLE
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </CardShell>

                <CardShell className="p-6 bg-bg-900/50 backdrop-blur-sm hidden lg:block">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
                      {t('project_toc')}
                    </div>
                    <div className={`text-[10px] font-pixel ${theme.accentText} opacity-80`}>
                      {String(tocItems.length).padStart(2, '0')}_NODES
                    </div>
                  </div>

                  <div ref={desktopTocScrollRef} className="max-h-[60vh] overflow-y-auto pr-1 -mr-1">
                    <nav className="space-y-1" aria-label={t('project_toc')}>
                      {tocItems.map((item) => {
                        const isActive = item.id === activeSectionId;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            data-toc-id={item.id}
                            onClick={() => handleTocSelect(item.id)}
                            className={`w-full text-left px-3 py-2 border transition-colors cursor-hover flex items-center justify-between gap-3 ${
                              isActive
                                ? `${theme.accentBgSoft} ${theme.accentBorder} text-white`
                                : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                            }`}
                            aria-current={isActive ? 'true' : undefined}
                          >
                            <span className="text-[11px] font-mono tracking-wide truncate">{item.label}</span>
                            <span className={`w-1.5 h-1.5 flex-shrink-0 ${isActive ? theme.accentBg : 'bg-gray-700'}`}></span>
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                </CardShell>
              </div>
            </aside>

            {/* Main Content */}
            <div className="order-1 lg:order-2 lg:col-span-9">
              {/* Mobile TOC Bar */}
              <div ref={mobileTocBarRef} className="lg:hidden sticky top-20 z-30">
                <div className="bg-bg/80 backdrop-blur-md border border-white/10 px-4 py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
                      {t('project_toc')}
                    </div>
                    <div className="text-sm font-mono text-white truncate">
                      {tocLabelById.get(activeSectionId) || tocItems[0]?.label}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileTocOpen(true)}
                    className={`flex items-center gap-2 px-3 py-2 border ${theme.accentBorder} ${theme.accentText} ${theme.accentBgSoft} hover:bg-white hover:text-black transition-colors cursor-hover flex-shrink-0`}
                  >
                    <List size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Index</span>
                  </button>
                </div>
              </div>

              <div className="space-y-16 mt-6 lg:mt-0">
                {/* Media */}
                <section id="media" className="scroll-mt-28">
                  <CardShell className="bg-black/40">
                    <div className="border-b border-white/10 px-5 py-4 flex items-center justify-between">
                      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
                        {t('project_media')}
                      </div>
                      <div className={`text-[10px] font-pixel ${theme.accentText} opacity-80`}>
                        FEED_{String(media.length).padStart(2, '0')}
                      </div>
                    </div>

                    <div className="p-2">
                      <div className="w-full aspect-video bg-black relative overflow-hidden group border border-white/10">
                        {activeMediaSrc ? (
                          <img
                            src={activeMediaSrc}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                          />
                        ) : null}
                        <div className={`absolute inset-0 ${theme.accentBg} opacity-0 group-hover:opacity-[0.08] transition-opacity pointer-events-none`}></div>
                        <div className="absolute top-0 left-0 right-0 h-7 bg-black/50 backdrop-blur-sm flex items-center justify-between px-3 border-b border-white/10">
                          <span className={`text-[10px] font-pixel ${theme.accentText} opacity-80`}>
                            ID_{project.id.padStart(4, '0')}
                          </span>
                          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                            {String(activeMediaIndex + 1).padStart(2, '0')}/{String(media.length).padStart(2, '0')}
                          </span>
                        </div>
                        <div className={`absolute top-0 left-0 w-9 h-9 border-t-2 border-l-2 ${theme.accentText} opacity-40`}></div>
                        <div className={`absolute bottom-0 right-0 w-9 h-9 border-b-2 border-r-2 ${theme.accentText} opacity-40`}></div>
                      </div>

                      {media.length > 1 ? (
                        <div className="p-4 grid grid-cols-5 sm:grid-cols-7 gap-3">
                          {media.slice(0, 7).map((src, idx) => {
                            const isActive = idx === activeMediaIndex;
                            return (
                              <button
                                key={`${src}-${idx}`}
                                type="button"
                                onClick={() => setActiveMediaIndex(idx)}
                                className={`aspect-video border overflow-hidden bg-black cursor-hover ${
                                  isActive ? `${theme.accentBorder}` : 'border-white/10 hover:border-white/30'
                                }`}
                                aria-current={isActive ? 'true' : undefined}
                                aria-label={`Select image ${idx + 1}`}
                              >
                                <img
                                  src={src}
                                  alt=""
                                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                />
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </CardShell>
                </section>

                {/* Overview */}
                <section id="overview" className="scroll-mt-28">
                  <CardShell className="bg-bg-900/50 backdrop-blur-sm">
                    <div className="border-b border-white/10 px-6 py-5 flex items-center justify-between">
                      <h2 className="font-pixel text-xl text-white flex items-center gap-3">
                        <span className={`${theme.accentText}`}>&gt;</span> {t('project_overview')}
                      </h2>
                      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
                        NODE_OVR
                      </div>
                    </div>
                    <div className="p-6 text-gray-300 font-light text-lg">
                      <RichText text={details.overview} variant="block" />
                    </div>
                  </CardShell>
                </section>

                {/* Contributions */}
                <section id="contributions" className="scroll-mt-28">
                  <CardShell className="bg-bg-900/50 backdrop-blur-sm">
                    <div className="border-b border-white/10 px-6 py-5 flex items-center justify-between">
                      <h2 className="font-pixel text-xl text-white flex items-center gap-3">
                        <span className={`${theme.accentText}`}>&gt;</span> {t('project_contributions')}
                      </h2>
                      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
                        {String(details.contributions.length).padStart(2, '0')}_OPS
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4">
                        {details.contributions.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300">
                            <span className={`mt-2 w-1.5 h-1.5 ${theme.accentBg} flex-shrink-0`}></span>
                            <span className="leading-relaxed text-gray-400">
                              <RichText text={item} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardShell>
                </section>

                {/* Long Form Sections */}
                {longFormSections.length > 0 ? (
                  <div className="space-y-10 border-t border-white/5 pt-12">
                    {longFormSections.map((section, sectionIdx) => (
                      <section key={section.id} id={section.id} className="scroll-mt-28">
                        <CardShell className="bg-bg-900/40 backdrop-blur-sm">
                          <div className="border-b border-white/10 px-6 py-5 flex items-center justify-between gap-6">
                            <div className="min-w-0">
                              <div
                                className={`text-[10px] font-mono uppercase tracking-[0.25em] ${theme.accentText} opacity-80 mb-2`}
                              >
                                ENTRY_{String(sectionIdx + 1).padStart(2, '0')}
                              </div>
                              <h2 className="text-xl md:text-2xl font-bold font-sans text-white truncate">
                                {section.title}
                              </h2>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-500 flex-shrink-0">
                              <span className="w-8 h-px bg-white/10"></span>
                              <span>LOG</span>
                              <span className="w-8 h-px bg-white/10"></span>
                            </div>
                          </div>

                          <div className="p-6 space-y-10">
                            {section.blocks.map((block, idx) => renderLongFormMedia(block, idx))}
                          </div>
                        </CardShell>
                      </section>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

        </div>

      </article>

      {isMobileTocOpen ? (
        <div className="fixed inset-0 z-[80] bg-bg/90 backdrop-blur-xl flex items-end sm:items-center justify-center p-4 relative">
          <button
            type="button"
            className="absolute inset-0 z-0 cursor-default focus:outline-none"
            onClick={() => setIsMobileTocOpen(false)}
            aria-label="Close navigation index"
          />

          <div className="w-full max-w-lg bg-bg-900 border border-white/10 shadow-2xl pixel-corners relative z-10">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
                {t('project_toc')}
              </div>
              <button
                type="button"
                onClick={() => setIsMobileTocOpen(false)}
                className="p-2 border border-white/10 hover:border-white/30 text-gray-300 hover:text-white transition-colors cursor-hover"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div ref={mobileTocScrollRef} className="max-h-[65vh] overflow-y-auto p-4">
              <nav className="space-y-2">
                {tocItems.map((item) => {
                  const isActive = item.id === activeSectionId;
                  return (
                    <button
                      key={`mobile-${item.id}`}
                      type="button"
                      data-toc-id={item.id}
                      onClick={() => handleTocSelect(item.id)}
                      className={`w-full text-left px-4 py-3 border transition-colors cursor-hover flex items-center justify-between gap-3 ${
                        isActive
                          ? `${theme.accentBgSoft} ${theme.accentBorder} text-white`
                          : 'bg-transparent border-white/10 text-gray-300 hover:border-white/30 hover:text-white'
                      }`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span className="text-sm font-mono truncate">{item.label}</span>
                      <span className={`w-2 h-2 flex-shrink-0 ${isActive ? theme.accentBg : 'bg-gray-700'}`}></span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
