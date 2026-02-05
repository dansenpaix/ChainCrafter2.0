import React, { useRef } from 'react';
import PixelAvatar from '../ui/PixelAvatar';
import styles from './ResultPreview.module.css';
import { ArrowRight, RefreshCw, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadAvatar } from '../../utils/download';

const ResultPreview = ({ onReset }) => {
  const avatarRef = useRef(null);

  const handleDownload = () => {
    const svg = document.querySelector(`.${styles.avatar}`);
    downloadAvatar(svg, 'my-pixel-avatar.png');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>GENERATION COMPLETE</h2>
      
      <div className={styles.previewArea}>
        <div className={styles.avatarCard}>
          <PixelAvatar seed={123} size={256} className={styles.avatar} />
          <div className={styles.stats}>
             <div className={styles.stat}>
               <span>Class:</span>
               <strong>Cyber-Ronin</strong>
             </div>
             <div className={styles.stat}>
               <span>Rarity:</span>
               <strong style={{color: 'purple'}}>Epic</strong>
             </div>
          </div>
        </div>
        
        <div className={styles.controls}>
          <p className={styles.prompt}>
            <strong>AI Analysis:</strong> Detected human male subject, short dark hair, glasses. Applied "Neon Noir" aesthetic filter.
          </p>
          
          <div className={styles.actions}>
            <button className={styles.secondaryBtn} onClick={onReset}>
              <RefreshCw size={18} />
              TRY AGAIN
            </button>
            <button className={styles.secondaryBtn} onClick={handleDownload}>
              <Download size={18} />
              DOWNLOAD
            </button>
            <Link to="/forge" className={styles.primaryBtn}>
              OPEN IN FORGE <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPreview;
