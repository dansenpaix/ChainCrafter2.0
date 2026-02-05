import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PixelAvatar from '../ui/PixelAvatar';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={`${styles.title} ${glitchActive ? styles.glitch : ''}`} data-text="CRAFT YOUR LEGEND">
          CRAFT YOUR LEGEND
        </h1>
        <p className={styles.subtitle}>
          The ultimate pixel art character creator for the decentralized web.
        </p>
        <div className={styles.actions}>
          <Link to="/forge" className={styles.primaryBtn}>
            ENTER THE FORGE
          </Link>
          <Link to="/ai-lab" className={styles.secondaryBtn}>
            AI PIXELIZE ME
          </Link>
        </div>
      </div>

      <div className={styles.visual}>
        <div className={`${styles.avatarContainer} animate-float`}>
           {/* Big Avatar */}
           <PixelAvatar seed={42} size={300} className={styles.heroAvatar} />
           
           {/* Glitch overlay effects or construction lines could go here */}
           <div className={styles.scannerLine}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
