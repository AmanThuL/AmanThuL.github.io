import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Photo } from '../../types';
import { SectionHeader } from '../ui/SectionHeader';

interface PhotoGridProps {
  photos: Photo[];
  onSelect: (photo: Photo) => void;
  title: React.ReactNode;
  subtitle: React.ReactNode;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onSelect, title, subtitle }) => {
  return (
    <section>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        subtitleClassName="text-cool-1"
        className="border-b border-white/10 pb-6"
      />
      <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-6">
        <span className="w-2 h-2 bg-cool-2 animate-pulse rounded-full"></span>
        LIVE_FEED
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            layoutId={`photo-${photo.id}`}
            onClick={() => onSelect(photo)}
            className="group relative aspect-[4/5] cursor-hover border border-white/10 bg-bg-900 overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

            <div className="absolute bottom-0 left-0 w-full p-4">
              <div className="text-[10px] font-mono text-cool-1 mb-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                CLICK_TO_ANALYZE
              </div>
              <h3 className="text-white font-bold text-lg leading-none mb-1">{photo.title}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-400 font-mono">
                <MapPin size={10} /> {photo.location}
              </div>
            </div>

            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30 group-hover:border-cool-2 transition-colors"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30 group-hover:border-cool-2 transition-colors"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
