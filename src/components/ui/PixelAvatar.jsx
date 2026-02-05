import React from 'react';
import styles from './PixelAvatar.module.css';

export const COLORS = {
  skin: ['#FFC0CB', '#8D5524', '#C68642', '#E0AC69', '#FFF0E0', '#5C3A21'],
  hair: ['#E0E0E0', '#FF00FF', '#00F3FF', '#39FF14', '#ffff00', '#1a1a1a', '#FF4444', '#AA00AA'], 
  eyes: ['#00F3FF', '#000000', '#FF00FF', '#39FF14', '#FFFFFF', '#FF0000'],
  clothes: ['#1a1a1a', '#333333', '#555555', '#0a0a1f', '#222222', '#666666']
};

const PixelAvatar = ({ seed = 0, traits = null, size = 64, className = '' }) => {
  const random = (offset) => Math.abs(Math.sin(seed + offset) * 10000) % 1;
  const pick = (arr, offset) => arr[Math.floor(random(offset) * arr.length)];

  const skinColor = traits?.skin || pick(COLORS.skin, 1);
  const hairColor = traits?.hair || pick(COLORS.hair, 2);
  const eyeColor = traits?.eyes || pick(COLORS.eyes, 3);
  const clothesColor = traits?.clothes || pick(COLORS.clothes, 4);

  // 16x16 Grid Construction for "Modern Shonen" style
  // We build this using layers instead of a raw 2D array for better procedural layering
  
  // 0: transparent
  // s: skin
  // h: hair
  // e: eyes (or blindfold)
  // c: clothes (jacket/collar)
  // o: outline/shadow (darker)

  const renderRects = () => {
    const rects = [];
    
    // Helper to add pixel
    const p = (x, y, color, type = 'base') => {
      // Scale 16x16 to 8x8 coordinate space if we want to keep ViewBox 0 0 16 16
      rects.push(
         <rect 
           key={`${x}-${y}-${type}`} 
           x={x} y={y} 
           width="1" height="1" 
           fill={color} 
           className={type === 'hair' ? styles.hairSway : type === 'eyes' ? styles.eyeGlow : ''}
         />
      );
    };

    // --- Base Body (Shoulders/Neck) ---
    for(let y=12; y<16; y++) {
      for(let x=4; x<12; x++) {
        p(x, y, clothesColor, 'clothes');
      }
    }
    // High collar
    p(4, 11, clothesColor); p(11, 11, clothesColor);
    p(3, 12, clothesColor); p(12, 12, clothesColor);

    // --- Head (Skin) ---
    // Chin/Jaw
    for(let x=5; x<11; x++) p(x, 11, skinColor, 'skin'); 
    for(let x=4; x<12; x++) {
      for(let y=5; y<11; y++) {
        p(x, y, skinColor, 'skin');
      }
    }

    // --- Face Details ---
    // Eyes / Blindfold
    // If seed is even, draw blindfold, else eyes
    const hasBlindfold = random(5) > 0.5;
    
    if (hasBlindfold) {
      // Blindfold across face
      for(let x=3; x<13; x++) {
        p(x, 7, '#000000', 'clothes');
        p(x, 8, '#000000', 'clothes');
      }
    } else {
      // Eyes
      p(5, 8, eyeColor, 'eyes');
      p(10, 8, eyeColor, 'eyes');
      // Eyebrows
      p(5, 6, hairColor, 'hair');
      p(10, 6, hairColor, 'hair');
    }
    
    // Mouth
    const mouthType = random(6);
    if (mouthType > 0.5) {
      p(7, 10, '#cc8888', 'skin'); // Small mouth
      p(8, 10, '#cc8888', 'skin');
    } else {
      p(8, 10, '#cc8888', 'skin'); // Smirk
    }


    // --- Hair (Spiky / Shonen) ---
    // Top spikes
    p(7, 1, hairColor, 'hair'); p(8, 1, hairColor, 'hair');
    p(6, 2, hairColor, 'hair'); p(9, 2, hairColor, 'hair');
    p(5, 3, hairColor, 'hair'); p(10, 3, hairColor, 'hair');
    
    // Side bangs
    p(3, 4, hairColor, 'hair'); p(12, 4, hairColor, 'hair');
    p(3, 5, hairColor, 'hair'); p(12, 5, hairColor, 'hair');
    p(2, 6, hairColor, 'hair'); p(13, 6, hairColor, 'hair');

    // Fill main hair volume
    for(let x=4; x<12; x++) p(x, 2, hairColor, 'hair');
    for(let x=3; x<13; x++) p(x, 3, hairColor, 'hair');
    for(let x=3; x<13; x++) p(x, 4, hairColor, 'hair');

    return rects;
  };

  return (
    <svg 
      viewBox="0 0 16 16" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`${className} ${styles.avatarContainer} ${styles.breathe}`}
      style={{ width: size, height: size, imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    >
      {renderRects()}
    </svg>
  );
};

export default PixelAvatar;
