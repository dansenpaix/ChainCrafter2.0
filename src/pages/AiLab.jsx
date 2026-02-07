import React, { useState, useEffect } from 'react';
import UploadZone from '../components/ailab/UploadZone';
import ScanningEffect from '../components/ailab/ScanningEffect';
import ResultPreview from '../components/ailab/ResultPreview';
import styles from './AiLab.module.css';

const AiLab = () => {
  const [step, setStep] = useState('upload'); // upload, scanning, result
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileSelected = (file) => {
    setImageFile(file); // Store the raw File object for the pixelator
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      setStep('scanning');
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (step === 'scanning') {
      const timer = setTimeout(() => {
        setStep('result');
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleReset = () => {
    setImageFile(null);
    setImageSrc(null);
    setStep('upload');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>NEURAL UPLINK / <span className={styles.highlight}>AI LAB</span></h1>
        <p className={styles.subtitle}>Upload biometric data for pixel conversion.</p>
      </div>

      <div className={styles.content}>
        {step === 'upload' && <UploadZone onFileSelected={handleFileSelected} />}
        {step === 'scanning' && <ScanningEffect imageSrc={imageSrc} />}
        {/* FIX: Passing the actual file object here */}
        {step === 'result' && (
          <ResultPreview uploadedFile={imageFile} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default AiLab;