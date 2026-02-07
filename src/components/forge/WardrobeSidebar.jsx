import React, { useState } from 'react';
import { User, Smile, Scissors, Shirt, Download } from 'lucide-react';
import { HexColorPicker } from "react-colorful"; // New draggable picker
import { COLORS } from '../ui/PixelAvatar';
import styles from './WardrobeSidebar.module.css';

const TABS = [
  { id: 'skin', label: 'SKIN', icon: User },
  { id: 'face', label: 'FACE', icon: Smile },
  { id: 'hair', label: 'STYLE', icon: Scissors },
  { id: 'clothes', label: 'GEAR', icon: Shirt },
];

const WardrobeSidebar = ({ currentTraits, onTraitChange, onRandomize }) => {
  const [activeTab, setActiveTab] = useState('skin');

  // Mapping tabs to current trait keys
  const tabToKey = {
    skin: 'skin',
    face: 'eyes',
    hair: 'hair',
    clothes: 'clothes'
  };

  const traitKey = tabToKey[activeTab];

const handleDownload = () => {
  // Target the specific avatar SVG
  const svg = document.querySelector(`.${styles.sidebar}`).parentElement.querySelector('svg');
  if (!svg) return;

  // Create a clone to avoid messing with the live UI
  const clonedSvg = svg.cloneNode(true);
  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  
  const canvas = document.createElement("canvas");
  // Set high resolution for the final output
  const exportSize = 1024;
  canvas.width = exportSize;
  canvas.height = exportSize;
  const ctx = canvas.getContext("2d");

  const img = new Image();
  // Using a Blob for more reliable cross-browser rendering
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    // 1. Draw the actual background used in the Stage
    ctx.fillStyle = "#050510"; // Base theme color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 2. Optional: If you want to capture the specific BACKGROUNDS[bgIndex]
    // You would need to pass the current background color as a prop to this component.

    // 3. Draw Avatar with pixel-perfect scaling
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, exportSize, exportSize);

    // 4. Execute download
    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = `ChainCrafter_${Date.now()}.png`;
    downloadLink.href = pngFile;
    downloadLink.click();
    
    // Cleanup memory
    URL.revokeObjectURL(url);
  };
  
  img.src = url;
};

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>THE WARDROBE</h2>
        <div className={styles.statusIndicator}>
          <div className={styles.led}></div>
          <span>LIVE CUSTOMIZER</span>
        </div>
      </div>

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={20} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <h3 className={styles.sectionTitle}>
          {activeTab.toUpperCase()} TUNING
          <span className={styles.sectionSubtitle}> // HEX_COORD</span>
        </h3>

        <div className={styles.pickerContainer}>
          {/* Draggable Color Palette */}
          <HexColorPicker
            color={currentTraits[traitKey]}
            onChange={(color) => onTraitChange(traitKey, color)}
          />

          <div className={styles.hexDisplay}>
            <span>VALUE:</span>
            <strong>{currentTraits[traitKey].toUpperCase()}</strong>
          </div>
        </div>

        <div className={styles.presetsSection}>
          <span className={styles.sectionSubtitle}>QUICK PRESETS</span>
          <div className={styles.optionsGrid}>
            {COLORS[traitKey === 'eyes' ? 'eyes' : traitKey].map((color, index) => (
              <button
                key={index}
                className={`${styles.optionBtn} ${currentTraits[traitKey] === color ? styles.activeOption : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => onTraitChange(traitKey, color)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.randomizeBtn} onClick={onRandomize}>
          ROLL RANDOM TRAITS
        </button>
        <button className={styles.downloadBtn} onClick={handleDownload}>
          <Download size={20} />
          DOWNLOAD AVATAR
        </button>
      </div>
    </aside>
  );
};

export default WardrobeSidebar;