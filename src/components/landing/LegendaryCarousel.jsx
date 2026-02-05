import React, { useState, useRef } from 'react';
import PixelAvatar from '../ui/PixelAvatar';
import styles from './LegendaryCarousel.module.css';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { downloadAvatar } from '../../utils/download';

const LEGENDARY_AVATARS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `Legend #${i + 1}`,
  seed: i * 1337
}));

const LegendaryCarousel = () => {
  const scrollRef = useRef(null);

  const handleDownload = (e, avatar) => {
    e.stopPropagation();
    const card = e.currentTarget.closest(`.${styles.card}`);
    const svg = card.querySelector('svg');
    downloadAvatar(svg, `${avatar.name.replace(/\s+/g, '_').toLowerCase()}.png`);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Approx card width
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.title}>LEGENDARY PRESETS</h2>
      
      <div className={styles.wrapper}>
        <button 
          className={`${styles.navBtn} ${styles.prev}`} 
          onClick={() => scroll('left')}
          aria-label="Previous"
        >
          <ChevronLeft size={32} />
        </button>

        <div className={styles.carouselContainer} ref={scrollRef}>
          {LEGENDARY_AVATARS.map((avatar, index) => (
            <div key={avatar.id} className={styles.card}>
              <div className={styles.avatarWrapper}>
                <PixelAvatar 
                  seed={avatar.seed} 
                  size={128} 
                  className={styles.avatar} 
                />
                <div className={styles.overlay}>
                  <button 
                    className={styles.downloadBtn} 
                    onClick={(e) => handleDownload(e, avatar)}
                    aria-label="Download"
                  >
                    <Download size={20} />
                  </button>
                </div>
              </div>
              <p className={styles.name}>{avatar.name}</p>
            </div>
          ))}
        </div>

        <button 
          className={`${styles.navBtn} ${styles.next}`} 
          onClick={() => scroll('right')}
          aria-label="Next"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </section>
  );
};

export default LegendaryCarousel;
