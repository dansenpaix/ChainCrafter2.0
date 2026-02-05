import React, { useState, useEffect } from 'react';
import PixelAvatar from '../ui/PixelAvatar';
import ParticleExplosion from '../ui/ParticleExplosion';
import styles from './CharacterStage.module.css';
import { Image, Box } from 'lucide-react';

const BACKGROUNDS = [
  { id: 'void', name: 'NEON VOID', color: 'radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.1) 0%, transparent 70%)' },
  { id: 'city', name: 'CYBER CITY', color: 'linear-gradient(to bottom, #0a0a2e, #2a0a2e)' },
  { id: 'zen', name: 'DIGITAL ZEN', color: 'linear-gradient(135deg, #001100, #003300)' },
];

const CharacterStage = ({ traits, isRandomizing }) => {
  const [bgIndex, setBgIndex] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [prevTraits, setPrevTraits] = useState(traits);

  // Trigger particles on trait change
  useEffect(() => {
    if (JSON.stringify(traits) !== JSON.stringify(prevTraits)) {
      setShowParticles(true);
      setPrevTraits(traits);
    }
  }, [traits, prevTraits]);

  const toggleBg = () => {
    setBgIndex((prev) => (prev + 1) % BACKGROUNDS.length);
  };

  return (
    <div 
      className={styles.stage}
      style={{ background: BACKGROUNDS[bgIndex].color }}
    >
      <div className={styles.bgLabel}>{BACKGROUNDS[bgIndex].name}</div>
      
      <div className={styles.pedestal}>
        <div className={styles.glow} />
      </div>
      
      <div className={`${styles.avatarWrapper} ${isRandomizing ? styles.shake : 'animate-float'}`}>
        <PixelAvatar 
          traits={traits} 
          size={400} 
          className={styles.avatar} 
        />
        {showParticles && <ParticleExplosion onComplete={() => setShowParticles(false)} />}
      </div>
      
      <div className={styles.controls}>
        <button className={styles.actionBtn} onClick={toggleBg}>
          <Image size={16} /> CHANGE BG
        </button>
        <button className={styles.actionBtn}>
          <Box size={16} /> POSE
        </button>
      </div>
    </div>
  );
};

export default CharacterStage;
