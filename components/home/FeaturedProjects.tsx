import React from 'react';
import { Project } from '../../types';
import { ProjectCard } from '../ProjectCard';
import { SectionHeader } from '../ui/SectionHeader';

interface FeaturedProjectsProps {
  projects: Project[];
  subtitle: React.ReactNode;
  title: React.ReactNode;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  subtitle,
  title,
}) => {
  return (
    <section className="py-20 bg-bg-900/30 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          subtitleClassName="text-warm"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {projects.map((project) => (
            <div key={project.id} className="h-[450px]">
              <ProjectCard project={project} large />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
