
import React, { useMemo, useState } from 'react';
import { getProjects } from '../data/projects';
import { ProjectCategory } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { ArchiveGrid } from '../components/home/ArchiveGrid';

const CATEGORIES: ProjectCategory[] = ['All', 'C++', 'Rendering', 'Unity', 'Gameplay', 'AI', 'Tech Art'];

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const { language, t } = useLanguage();
  
  const projects = getProjects(language);
  const featuredProjects = useMemo(
    () => projects.filter((p) => p.featured).slice(0, 2),
    [projects],
  );
  const otherProjects = useMemo(() => {
    let filtered = projects.filter((p) => !p.featured);
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.tags.includes(selectedCategory));
    }
    return filtered;
  }, [selectedCategory, projects]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-bg">
      <HeroSection />
      <FeaturedProjects
        projects={featuredProjects}
        title={t('section_featured')}
        subtitle="// FEATURED WORK"
      />
      <ArchiveGrid
        projects={otherProjects}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        title={t('section_archive')}
        subtitle="// EXPLORE ALL MODULES"
        allLabel={t('filter_all')}
      />
    </div>
  );
};
