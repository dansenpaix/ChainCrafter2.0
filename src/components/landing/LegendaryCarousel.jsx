import React from 'react';
import PixelAvatar from '../ui/PixelAvatar';
import styles from './LegendaryCarousel.module.css';
import { Download } from 'lucide-react';

const LEGENDARY_AVATARS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `Legend #${i + 1}`,
  seed: i * 1337
}));

const LegendaryCarousel = () => {
  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.title}>LEGENDARY PRESETS</h2>
      
      <div className={styles.carouselContainer}>
        {/* Double the list for seamless loop */}
        <div className={styles.track}>
          {[...LEGENDARY_AVATARS, ...LEGENDARY_AVATARS].map((avatar, index) => (
            <div key={`${avatar.id}-${index}`} className={styles.card}>
              <div className={styles.avatarWrapper}>
                <PixelAvatar seed={avatar.seed} size={128} className={styles.avatar} />
                <div className={styles.overlay}>
                  <button className={styles.downloadBtn}>
                    <Download size={20} />
                  </button>
                </div>
              </div>
              <p className={styles.name}>{avatar.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegendaryCarousel;
