import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Cpu, MapPin, Maximize2, X } from 'lucide-react';
import { Photo } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface PhotoLightboxProps {
  photo: Photo | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photo, onClose }) => {
  const { t } = useLanguage();

  if (!photo) return null;

  return createPortal(
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            layoutId={`photo-${photo.id}`}
            className="w-full max-w-7xl h-[90vh] bg-black border border-white/10 grid grid-cols-1 lg:grid-cols-3 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 border border-white/20 text-white hover:bg-white hover:text-black transition-all cursor-hover"
            >
              <X size={24} />
            </button>

            <div className="lg:col-span-2 h-full bg-black relative flex items-center justify-center p-4 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
              <img
                src={photo.url}
                alt={photo.title}
                className="max-w-full max-h-full object-contain shadow-2xl"
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              ></div>
            </div>

            <div className="h-full flex flex-col bg-bg-900 overflow-y-auto">
              <div className="p-8 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-2 text-cool-1 text-xs font-mono uppercase tracking-widest mb-4">
                  <Maximize2 size={12} /> {t('lightbox_analysis')}
                </div>
                <h2 className="text-3xl font-pixel text-white mb-2 uppercase">{photo.title}</h2>
                <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
                  <MapPin size={14} /> {photo.location}
                </div>
              </div>

              <div className="p-8 flex-grow">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                  {t('lightbox_log')}
                </h4>
                <p className="text-gray-300 font-light leading-relaxed text-lg border-l-2 border-cool-2 pl-4">
                  &ldquo;{photo.thoughts}&rdquo;
                </p>
              </div>

              <div className="bg-black p-8 border-t border-white/10 flex-shrink-0">
                <h4 className="text-[10px] font-mono text-warm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Cpu size={12} /> {t('lightbox_exif')}
                </h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs font-mono">
                  <div>
                    <div className="text-gray-600 uppercase text-[9px] mb-1">Camera Body</div>
                    <div className="text-white">{photo.params.camera}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 uppercase text-[9px] mb-1">Lens Model</div>
                    <div className="text-white">{photo.params.lens}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 uppercase text-[9px] mb-1">Aperture</div>
                    <div className="text-cool-2">{photo.params.aperture}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 uppercase text-[9px] mb-1">Shutter / ISO</div>
                    <div className="text-cool-2">
                      {photo.params.shutter} / ISO {photo.params.iso}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
