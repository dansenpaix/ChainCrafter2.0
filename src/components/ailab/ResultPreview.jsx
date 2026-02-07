import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, RefreshCw, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './ResultPreview.module.css';

const ResultPreview = ({ uploadedFile, onReset }) => {
  const canvasRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Only proceed if we have a valid file
    if (!uploadedFile || !(uploadedFile instanceof File)) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = new Image();
    const objectUrl = URL.createObjectURL(uploadedFile);

    img.onload = () => {
      const size = 600;
      canvas.width = size;
      canvas.height = size;

      // Pixelation size (15-20 is ideal for your 'Cyber-Ronin' look)
      const pixelSize = 15;
      const w = size / pixelSize;
      const h = size / pixelSize;

      // Offscreen processing
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d');

      // Draw small, then scale back up without smoothing
      offCtx.drawImage(img, 0, 0, w, h);

      ctx.imageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;

      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(offscreen, 0, 0, w, h, 0, 0, size, size);

      setIsProcessing(false);
    };

    img.src = objectUrl;
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedFile]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `chaincrafter-avatar-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isProcessing ? "PROCESSING UPLINK..." : "NEURAL UPLINK / AI LAB"}
      </h2>

      <div className={styles.previewArea}>
        <div className={styles.avatarCard}>
          <div className={styles.canvasContainer}>
            <canvas ref={canvasRef} className={styles.avatarCanvas} />
            {isProcessing && <div className={styles.overlayText}>UPLINKING...</div>}
          </div>

          <div className={styles.stat}>
            <span>Class:</span>
            <strong>Cyber-Ronin</strong>
          </div>
          <div className={styles.stat}>
            <span>Status:</span>
            <strong style={{ color: 'var(--color-secondary)' }}>Verified</strong>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.prompt}>
            <strong>AI Analysis:</strong> Subject re-sampled. Aesthetic: Neon Noir. Rarity: Epic.
          </div>

          <div className={styles.actions}>
            <button className={styles.secondaryBtn} onClick={onReset}>
              <RefreshCw size={18} /> TRY AGAIN
            </button>
            <button className={styles.secondaryBtn} onClick={handleDownload}>
              <Download size={18} /> DOWNLOAD
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