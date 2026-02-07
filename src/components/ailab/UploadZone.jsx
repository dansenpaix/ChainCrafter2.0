import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import styles from './UploadZone.module.css';

const UploadZone = ({ onFileSelected }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents browser redirect
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Validation check
      if (file.type.startsWith('image/')) {
        onFileSelected(file);
      } else {
        alert('Please upload an image file (JPG, PNG).');
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
      // Reset the input value so the same file can be uploaded twice if needed
      e.target.value = null; 
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
        accept="image/png, image/jpeg, image/jpg" 
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