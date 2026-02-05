import React, { useState, useEffect } from 'react';
import CharacterStage from '../components/forge/CharacterStage';
import WardrobeSidebar from '../components/forge/WardrobeSidebar';
import { COLORS } from '../components/ui/PixelAvatar';
import styles from './Forge.module.css';

const Forge = () => {
  const [traits, setTraits] = useState({
    skin: COLORS.skin[0],
    hair: COLORS.hair[0],
    eyes: COLORS.eyes[0],
    clothes: COLORS.clothes[0]
  });
  const [isRandomizing, setIsRandomizing] = useState(false);

  // Initialize with random traits
  useEffect(() => {
    handleRandomize();
  }, []);

  const handleTraitChange = (key, value) => {
    setTraits(prev => ({ ...prev, [key]: value }));
  };

  const handleRandomize = () => {
    setIsRandomizing(true);
    
    // Slot machine logic effect
    let interval;
    let count = 0;
    
    interval = setInterval(() => {
      count++;
      setTraits({
        skin: COLORS.skin[Math.floor(Math.random() * COLORS.skin.length)],
        hair: COLORS.hair[Math.floor(Math.random() * COLORS.hair.length)],
        eyes: COLORS.eyes[Math.floor(Math.random() * COLORS.eyes.length)],
        clothes: COLORS.clothes[Math.floor(Math.random() * COLORS.clothes.length)]
      });
      
      if (count > 10) {
        clearInterval(interval);
        setIsRandomizing(false);
      }
    }, 100);
  };

  return (
    <div className={styles.forgeContainer}>
      <main className={styles.stageArea}>
        <CharacterStage traits={traits} isRandomizing={isRandomizing} />
      </main>
      <WardrobeSidebar 
        currentTraits={traits} 
        onTraitChange={handleTraitChange} 
        onRandomize={handleRandomize}
      />
    </div>
  );
};

export default Forge;
