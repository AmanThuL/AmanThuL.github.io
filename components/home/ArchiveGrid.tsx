import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types';
import { SectionHeader } from '../ui/SectionHeader';
import { FilterButton } from '../ui/FilterButton';
import { ProjectCard } from '../ProjectCard';

interface ArchiveGridProps {
  projects: Project[];
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  allLabel: React.ReactNode;
}

export const ArchiveGrid: React.FC<ArchiveGridProps> = ({
  projects,
  categories,
  selectedCategory,
  onSelectCategory,
  title,
  subtitle,
  allLabel,
}) => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-white/10 pb-6">
        <SectionHeader title={title} subtitle={subtitle} subtitleClassName="text-cool-1" />

        <div className="flex flex-wrap justify-start md:justify-end gap-2">
          <FilterButton
            active={selectedCategory === 'All'}
            onClick={() => onSelectCategory('All')}
          >
            {allLabel}
          </FilterButton>
          {categories
            .filter((c) => c !== 'All')
            .map((cat) => (
              <FilterButton
                key={cat}
                active={selectedCategory === cat}
                onClick={() => onSelectCategory(cat)}
              >
                {cat}
              </FilterButton>
            ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[500px]"
      >
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="min-h-[380px] md:h-[410px]"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
