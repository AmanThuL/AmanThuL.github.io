
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getProjects } from '../data/projects';
import { ArrowLeft, ExternalLink, Calendar, Users, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  
  const projects = getProjects(language);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const { details } = project;

  return (
    <div className="min-h-screen bg-bg relative">
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-bg/50 to-bg z-0"></div>

      <article className="pt-24 pb-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-4">
            <Link to="/" className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-warm transition-colors cursor-hover">
                <ArrowLeft size={14} /> {t('back_home')}
            </Link>
            <div className="text-[10px] font-pixel text-cool-1">
              ID: {project.id.padStart(4, '0')} {'// SECURE'}
            </div>
        </div>

        {/* Header Content */}
        <header className="mb-16">
            <div className="flex flex-wrap gap-3 mb-6">
                {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-cool-1">
                        {tag}
                    </span>
                ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-pixel text-white mb-8 uppercase leading-none break-words">
                {project.title}
            </h1>

            <div className="h-1 w-24 bg-warm mb-12"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Data Log */}
            <aside className="order-2 lg:order-1 lg:col-span-3">
                <div className="lg:sticky lg:top-24 space-y-8 bg-bg-900/50 p-6 border border-white/10 backdrop-blur-sm">
                    <div>
                        <div className="flex items-center gap-2 text-gray-500 mb-2 uppercase text-[10px] font-mono tracking-widest">
                             <Target size={12} /> {t('project_role')}
                        </div>
                        <div className="text-white font-sans font-medium">{details.role}</div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-gray-500 mb-2 uppercase text-[10px] font-mono tracking-widest">
                             <Calendar size={12} /> {t('project_timeline')}
                        </div>
                        <div className="text-white font-sans font-medium">{details.timeline}</div>
                    </div>
                     <div>
                        <div className="flex items-center gap-2 text-gray-500 mb-2 uppercase text-[10px] font-mono tracking-widest">
                             <Users size={12} /> {t('project_team')}
                        </div>
                        <div className="text-white font-sans text-sm">
                            {details.team.map((m, i) => <div key={i}>{m}</div>)}
                        </div>
                    </div>

                    {/* Links */}
                    {details.assetLinks.length > 0 && (
                        <div className="pt-6 border-t border-white/10">
                            {details.assetLinks.map((link, i) => (
                                <a key={i} href={link.url} className="flex items-center justify-between w-full p-2 mb-2 bg-warm/10 border border-warm/30 text-warm hover:bg-warm hover:text-black transition-all text-xs font-mono uppercase tracking-wider cursor-hover">
                                    {link.label} <ExternalLink size={12} />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <div className="order-1 lg:order-2 lg:col-span-9 space-y-16">
                
                {/* Hero Image */}
                <div className="w-full aspect-video bg-black border border-white/10 relative overflow-hidden group">
                     <img 
                        src={project.gallery[0] || project.thumbnail} 
                        alt={project.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                     />
                     {/* Corner Accents */}
                     <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cool-1 opacity-50"></div>
                     <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cool-1 opacity-50"></div>
                </div>

                {/* Overview & Tech Specs */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="font-pixel text-xl text-white mb-6 flex items-center gap-2">
                            <span className="text-warm">&gt;</span> {t('project_overview')}
                        </h3>
                        <p className="text-gray-300 font-light leading-relaxed text-lg">
                            {details.overview}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-pixel text-xl text-white mb-6 flex items-center gap-2">
                            <span className="text-cool-2">&gt;</span> {t('project_contributions')}
                        </h3>
                         <ul className="space-y-3">
                            {details.contributions.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-400">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-cool-2 flex-shrink-0"></span>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Long Form Dynamic */}
                <section className="space-y-12 border-t border-white/5 pt-12">
                    {details.longFormContent.map((block, idx) => {
                         if (block.type === 'heading') {
                            return (
                                <h2 key={idx} className="text-2xl font-bold font-sans text-white pt-8">
                                    <span className="text-warm mr-2">#</span>{block.content}
                                </h2>
                            );
                          }
                          if (block.type === 'text') {
                            return <p key={idx} className="text-gray-300 leading-8 text-lg font-light max-w-3xl">{block.content}</p>;
                          }
                          if (block.type === 'image') {
                            return (
                              <figure key={idx} className="w-full my-8">
                                <div className="border border-white/10 p-1 bg-bg-900">
                                     <img src={block.content} alt={block.caption} className="w-full h-auto grayscale-[20%]" />
                                </div>
                                {block.caption && (
                                  <figcaption className="mt-2 text-xs font-mono text-gray-500 uppercase tracking-widest text-right">
                                    Fig_{idx}. {block.caption}
                                  </figcaption>
                                )}
                              </figure>
                            );
                          }
                          return null;
                    })}
                </section>
            </div>

        </div>

      </article>
    </div>
  );
};
