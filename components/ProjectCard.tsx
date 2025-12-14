import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Project, ProjectTheme } from '../types';
import { ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  large?: boolean; // For featured cards
}

const THEME_STYLES: Record<ProjectTheme, { borderText: string; bg: string; gradient: string }> = {
  hero_role_gpu: {
    borderText: 'border-cool-2 text-cool-2',
    bg: 'bg-cool-2',
    gradient: 'group-hover:from-cool-2 group-hover:to-white',
  },
  hero_role_research: {
    borderText: 'border-cool-1 text-cool-1',
    bg: 'bg-cool-1',
    gradient: 'group-hover:from-cool-1 group-hover:to-cool-2',
  },
  hero_role_game: {
    borderText: 'border-warm text-warm',
    bg: 'bg-warm',
    gradient: 'group-hover:from-warm group-hover:to-white',
  },
};

const getThemeStyles = (theme: ProjectTheme) => THEME_STYLES[theme];

const TAG_CLASS = 'text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 border border-white/15 text-gray-200 bg-white/5';

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, large = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const { borderText: themeClass, bg: bgClass, gradient } = getThemeStyles(project.theme);

  useEffect(() => {
    if (isHovered && project.gallery.length > 1) {
      intervalRef.current = window.setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentImageIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, project.gallery.length]);

  return (
    <Link to={`/project/${project.slug}`} className={`group block h-full cursor-hover relative ${large ? 'md:col-span-2' : ''}`}>
       {/* Background Glow */}
      <div className={`absolute inset-0 ${bgClass} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}></div>

      <article
        className={`flex flex-col h-full bg-bg-900 border border-white/10 transition-all duration-300 relative overflow-hidden ${large ? 'md:flex-row' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dynamic Border On Hover */}
        <div className={`absolute inset-0 border-2 ${themeClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 pixel-corners`}></div>

        {/* Header / ID Strip */}
        <div className={`absolute top-0 left-0 right-0 h-6 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-between px-2 border-b border-white/5`}>
            <span className={`text-[10px] font-pixel ${themeClass} opacity-70`}>ID_{project.id.padStart(3, '0')}</span>
            <div className="flex gap-1">
                <div className={`w-1 h-1 rounded-sm ${bgClass}`}></div>
                <div className="w-1 h-1 rounded-sm bg-gray-700"></div>
            </div>
        </div>

        {/* Image Container */}
        <div className={`relative overflow-hidden bg-black flex-shrink-0 ${large ? 'md:w-3/5 h-64 md:h-auto' : 'h-48'}`}>
          <img
            src={project.gallery.length > 0 ? project.gallery[currentImageIndex] : project.thumbnail}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-300 filter ${isHovered ? 'grayscale-0 contrast-110' : 'grayscale contrast-125'}`}
          />

          {/* Glitch Overlay */}
          <div className={`absolute inset-0 bg-repeat opacity-0 group-hover:opacity-20 transition-opacity duration-100 pointer-events-none mix-blend-overlay z-10`}
               style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjUiLz48L3N2Zz4=")' }}
          ></div>
        </div>

        {/* Content */}
        <div className={`p-6 flex flex-col relative z-10 ${large ? 'md:w-2/5 justify-center' : 'flex-grow'}`}>
          <div className="mb-2">
             <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className={TAG_CLASS}>
                        {tag}
                    </span>
                ))}
             </div>
             <h3 className={`text-lg md:text-xl font-pixel text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${gradient} transition-all line-clamp-1`}>
                {project.title.toUpperCase()}
             </h3>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 font-mono leading-relaxed mb-6 line-clamp-3 min-h-[4.5em]">
            {project.shortDescription}
          </p>

          <div className="mt-auto flex items-center gap-2 text-xs font-mono text-gray-500 group-hover:text-white transition-colors">
             <span className="uppercase tracking-widest">Execute</span>
             <ChevronRight size={14} className={`${themeClass}`} />
          </div>
        </div>
      </article>
    </Link>
  );
};
