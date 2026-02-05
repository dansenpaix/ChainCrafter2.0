export const downloadAvatar = (svgElement, filename = 'avatar.png') => {
  if (!svgElement) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set high resolution for download (1024x1024)
  const size = 1024;
  canvas.width = size;
  canvas.height = size;

  const data = (new XMLSerializer()).serializeToString(svgElement);
  const img = new Image();
  
  // Create a Blob from the SVG data
  const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    // Disable smoothing for pixel art
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, size, size);
    
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  img.src = url;
};
