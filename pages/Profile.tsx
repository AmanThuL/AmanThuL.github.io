
import React, { useEffect, useState } from 'react';
import { getAchievements, getBioData, getPhotos } from '../data/profile';
import { Photo } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { IntroSection } from '../components/profile/IntroSection';
import { AchievementsSection } from '../components/profile/AchievementsSection';
import { PhotoGrid } from '../components/profile/PhotoGrid';
import { PhotoLightbox } from '../components/profile/PhotoLightbox';

export const Profile: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { language, t } = useLanguage();

  const bioData = getBioData(language);
  const achievements = getAchievements(language);
  const photos = getPhotos(language);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPhoto) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto]);

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <IntroSection
          heading={bioData.heading}
          subheading={bioData.subheading}
          philosophy={bioData.philosophy}
        />

        <AchievementsSection
          title={t('profile_awards')}
          subtitle="// PATENTS, PUBLICATIONS & AWARDS"
          items={achievements}
        />

        <PhotoGrid
          photos={photos}
          onSelect={setSelectedPhoto}
          title={t('profile_photos')}
          subtitle="// LATEST CAPTURES"
        />
      </main>

      <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
};
