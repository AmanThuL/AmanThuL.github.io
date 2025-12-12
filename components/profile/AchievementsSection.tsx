import React from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '../../types';
import { SectionHeader } from '../ui/SectionHeader';
import { Award } from 'lucide-react';

interface AchievementsSectionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  items: Achievement[];
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  title,
  subtitle,
  items,
}) => {
  return (
    <section className="mb-32">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        subtitleClassName="text-warm"
        className="border-b border-white/10 pb-6"
      />
      <div className="flex justify-end items-center gap-2 text-warm opacity-50 mb-6">
        <Award size={20} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-bg-900 border border-white/10 hover:border-cool-2/50 p-6 transition-all cursor-hover"
          >
            <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-600 group-hover:text-cool-2 transition-colors">
              {item.year}
            </div>
            <div className="mb-4">
              <span
                className={`text-[10px] font-bold uppercase px-2 py-1 border ${
                  item.type === 'Patent'
                    ? 'border-cool-1 text-cool-1'
                    : item.type === 'Publication'
                      ? 'border-warm text-warm'
                      : 'border-gray-500 text-gray-400'
                }`}
              >
                {item.type}
              </span>
            </div>
            <h3 className="text-xl text-white font-sans font-bold mb-2 group-hover:text-cool-2 transition-colors">
              {item.title}
            </h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                {item.organization}
              </span>
              {item.link && (
                <a
                  href={item.link}
                  className="text-gray-500 group-hover:text-white text-xs font-mono"
                >
                  View
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
