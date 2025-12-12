
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBlogPosts } from '../data/blog';
import { BlogCategory } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { FilterBar } from '../components/blog/FilterBar';
import { PostCard } from '../components/blog/PostCard';

const BLOG_CATEGORIES: BlogCategory[] = ['All', 'Graphics', 'Unity', 'HDRP', 'Tutorial', 'Career'];

export const BlogList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const { language } = useLanguage();
  const blogPosts = getBlogPosts(language);

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.tags.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-cool-2/10 border border-cool-2 text-cool-2 text-[10px] font-pixel uppercase tracking-widest">
                    DevLog v1.0
                </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-pixel text-white mb-6 uppercase tracking-tight">
                Knowledge_Base
            </h1>
            <p className="text-gray-400 font-mono text-sm max-w-2xl border-l-2 border-cool-2 pl-4">
                {language === 'zh' 
                 ? "研究笔记、技术拆解以及图形系统的回顾分析。" 
                 : "Research notes, technical breakdowns, and retrospective analysis of graphical systems."}
            </p>
          </motion.div>
        </div>

        <FilterBar
          categories={BLOG_CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          allLabel={language === 'zh' ? '全部' : 'All'}
        />

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
                {filteredPosts.map((post) => (
                    <motion.div
                        key={post.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PostCard post={post} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

      </main>
    </div>
  );
};
