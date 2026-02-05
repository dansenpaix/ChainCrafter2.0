import React, { useState, useCallback } from 'react';
import { Upload, FileImage, AlertCircle } from 'lucide-react';
import styles from './UploadZone.module.css';

const UploadZone = ({ onFileSelected }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelected(file);
      } else {
        alert('Please upload an image file.');
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        id="fileInput" 
        className={styles.fileInput} 
        onChange={handleChange} 
        accept="image/*" 
      />
      <label htmlFor="fileInput" className={styles.content}>
        <div className={styles.iconWrapper}>
          <Upload size={48} className={styles.icon} />
        </div>
        <h3 className={styles.title}>UPLOAD SOURCE MATERIAL</h3>
        <p className={styles.subtitle}>Drag & Drop or Click to Browse</p>
        <div className={styles.info}>
          <AlertCircle size={16} />
          <span>Supports JPG, PNG (Max 5MB)</span>
        </div>
      </label>
      
      {/* Decorative corners */}
      <div className={`${styles.corner} ${styles.tl}`}></div>
      <div className={`${styles.corner} ${styles.tr}`}></div>
      <div className={`${styles.corner} ${styles.bl}`}></div>
      <div className={`${styles.corner} ${styles.br}`}></div>
    </div>
  );
};

export default UploadZone;
