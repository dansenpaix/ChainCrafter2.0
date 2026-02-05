import React, { useState, useRef } from 'react';
import PixelAvatar from '../ui/PixelAvatar';
import styles from './AiTeaser.module.css';

const AiTeaser = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderValue((x / rect.width) * 100);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    setSliderValue((x / rect.width) * 100);
  };

  return (
    <section className={styles.teaserSection}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h2 className={styles.title}>AI PIXELIZER</h2>
          <p className={styles.description}>
            Transform reality into digital art. Our neural construct scans your photo 
            and reassembles it into a ChainCraft compatible avatar.
          </p>
          <button className={styles.cta}>TRY THE BETA</button>
        </div>

        <div 
          className={styles.comparison} 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          <div className={styles.imageLayer}>
             {/* Placeholder for "Real" photo. Using a gradient or simple SVG for now */}
             <div className={styles.realPhotoPlaceholder}>
               <span>ORIGINAL</span>
             </div>
          </div>
          
          <div 
            className={styles.pixelLayer} 
            style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
          >
             <div className={styles.pixelContent}>
                <PixelAvatar seed={999} size={300} />
                <span className={styles.label}>PIXELATED</span>
             </div>
          </div>
          
          <div 
            className={styles.sliderHandle}
            style={{ left: `${sliderValue}%` }}
          >
            <div className={styles.sliderLine} />
            <div className={styles.sliderCircle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8L22 12L18 16" />
                <path d="M6 8L2 12L6 16" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiTeaser;
