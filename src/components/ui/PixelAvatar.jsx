import React from 'react';

// Simple procedural generation for 8x8 pixel art scaled up
// This is a placeholder for the actual 64x64 pixel art
// In a real app, we would probably use actual images or a more complex canvas renderer

export const COLORS = {
  skin: ['#FFC0CB', '#8D5524', '#C68642', '#E0AC69', '#FFF0E0', '#5C3A21'],
  hair: ['#FF00FF', '#00F3FF', '#39FF14', '#ffff00', '#ffffff', '#000000', '#FF4444', '#AA00AA'],
  eyes: ['#00F3FF', '#FF00FF', '#39FF14', '#FFFFFF', '#000000', '#FF0000'],
  clothes: ['#333333', '#555555', '#1a1a1a', '#0a0a1f', '#222222', '#666666']
};

const PixelAvatar = ({ seed = 0, traits = null, size = 64, className = '' }) => {
  // Simple pseudo-random function
  const random = (offset) => {
    return Math.abs(Math.sin(seed + offset) * 10000) % 1;
  };

  const pick = (arr, offset) => arr[Math.floor(random(offset) * arr.length)];

  const skinColor = traits?.skin || pick(COLORS.skin, 1);
  const hairColor = traits?.hair || pick(COLORS.hair, 2);
  const eyeColor = traits?.eyes || pick(COLORS.eyes, 3);
  const clothesColor = traits?.clothes || pick(COLORS.clothes, 4);

  // A very abstract "face" on a 8x8 grid
  // 0: transparent, 1: skin, 2: hair, 3: eyes, 4: clothes
  const grid = [
    [0, 0, 2, 2, 2, 2, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 3, 1, 3, 1, 0],
    [0, 2, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 4, 4, 4, 4, 0, 0],
    [0, 4, 4, 4, 4, 4, 4, 0],
  ];

  return (
    <svg 
      viewBox="0 0 8 8" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      style={{ width: size, height: size, imageRendering: 'pixelated' }}
    >
      {grid.map((row, y) => 
        row.map((cell, x) => {
          let fill = 'transparent';
          if (cell === 1) fill = skinColor;
          if (cell === 2) fill = hairColor;
          if (cell === 3) fill = eyeColor;
          if (cell === 4) fill = clothesColor;
          
          if (cell === 0) return null;
          
          return (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill} />
          );
        })
      )}
    </svg>
  );
};

export default PixelAvatar;
