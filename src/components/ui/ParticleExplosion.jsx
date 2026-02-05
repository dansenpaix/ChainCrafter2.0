import React, { useEffect, useState } from 'react';
import styles from './ParticleExplosion.module.css';

const ParticleExplosion = ({ onComplete }) => {
  const [particles] = useState(Array.from({ length: 12 }));

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={styles.container}>
      {particles.map((_, i) => (
        <div key={i} className={`${styles.particle} ${styles[`p${i}`]}`} />
      ))}
    </div>
  );
};

export default ParticleExplosion;
