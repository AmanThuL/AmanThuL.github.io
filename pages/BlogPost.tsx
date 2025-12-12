
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getBlogPosts } from '../data/blog';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const blogPosts = getBlogPosts(language);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-bg relative">
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-bg/80 to-bg z-0"></div>

      <article className="pt-32 pb-20 relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-cool-2 transition-colors cursor-hover mb-12">
            <ArrowLeft size={14} /> {t('back_blog')}
        </Link>

        {/* Header */}
        <header className="mb-16 border-b border-white/10 pb-12">
            <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-cool-2/10 border border-cool-2/30 text-cool-2 text-xs font-mono font-bold uppercase tracking-wider">
                        {tag}
                    </span>
                ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel text-white mb-8 uppercase leading-tight">
                {post.title}
            </h1>

            <div className="flex items-center gap-8 text-xs font-mono text-gray-500 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                    <Calendar size={14} /> {post.date}
                </span>
                <span className="flex items-center gap-2">
                    <Clock size={14} /> {post.readTime}
                </span>
                <span className="text-cool-2">
                    {'// AUTH: R.ZHANG'}
                </span>
            </div>
        </header>

        {/* Content Body */}
        <div className="space-y-10">
            {post.content.map((block, idx) => {
                switch (block.type) {
                    case 'heading':
                        return (
                            <h2 key={idx} className="text-2xl md:text-3xl font-bold font-sans text-white pt-8 flex items-center gap-3">
                                <span className="w-2 h-2 bg-cool-2 flex-shrink-0"></span>
                                {block.content}
                            </h2>
                        );
                    case 'text':
                        return (
                            <p key={idx} className="text-gray-300 leading-8 text-lg font-light font-sans">
                                {block.content}
                            </p>
                        );
                    case 'image':
                        return (
                            <figure key={idx} className="my-8 group">
                                <div className="border border-white/10 p-1 bg-bg-900 relative overflow-hidden">
                                     {/* Glitch overlay on hover */}
                                     <div className="absolute inset-0 bg-cool-2/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                     <img src={block.content} alt={block.caption} className="w-full h-auto grayscale-[10%] group-hover:grayscale-0 transition-all" />
                                </div>
                                {block.caption && (
                                  <figcaption className="mt-3 text-xs font-mono text-gray-500 uppercase tracking-widest border-l-2 border-cool-2 pl-3">
                                    Fig_{idx}. {block.caption}
                                  </figcaption>
                                )}
                            </figure>
                        );
                    case 'code':
                        return (
                            <div key={idx} className="my-6 bg-black border border-white/10 p-6 font-mono text-sm text-gray-300 overflow-x-auto">
                                <pre><code>{block.content}</code></pre>
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
            <div className="text-[10px] font-mono text-gray-600 uppercase">
                END OF RECORD
            </div>
            <Link to="/blog" className="px-6 py-3 border border-white/20 hover:border-cool-2 hover:bg-cool-2/10 hover:text-white transition-all text-xs font-mono font-bold uppercase tracking-widest text-gray-400 cursor-hover">
                {t('back_blog')}
            </Link>
        </div>

      </article>
    </div>
  );
};
