import React from 'react';
import styles from './ScanningEffect.module.css';

const ScanningEffect = ({ imageSrc }) => {
  return (
    <div className={styles.container}>
      <img src={imageSrc} alt="Scanning source" className={styles.sourceImage} />
      
      <div className={styles.overlay}>
        <div className={styles.grid}></div>
        <div className={styles.scanLine}></div>
        <div className={styles.status}>
          <span className={styles.text}>ANALYZING BIO-METRICS...</span>
          <div className={styles.loader}></div>
        </div>
      </div>
    </div>
  );
};

export default ScanningEffect;
