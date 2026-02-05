import React, { useState } from 'react';
import { User, Smile, Scissors, Shirt, ChevronRight } from 'lucide-react';
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

  const renderOptions = () => {
    let options = [];
    let traitKey = '';

    switch (activeTab) {
      case 'skin':
        options = COLORS.skin;
        traitKey = 'skin';
        break;
      case 'face':
        options = COLORS.eyes; // Mapping Face tab to Eye color for now
        traitKey = 'eyes';
        break;
      case 'hair':
        options = COLORS.hair;
        traitKey = 'hair';
        break;
      case 'clothes':
        options = COLORS.clothes;
        traitKey = 'clothes';
        break;
      default:
        options = [];
    }

    return (
      <div className={styles.optionsGrid}>
        {options.map((color, index) => (
          <button
            key={`${traitKey}-${index}`}
            className={`${styles.optionBtn} ${currentTraits[traitKey] === color ? styles.activeOption : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onTraitChange(traitKey, color)}
            aria-label={`Select ${traitKey} color ${index + 1}`}
          >
            {currentTraits[traitKey] === color && <div className={styles.check}></div>}
          </button>
        ))}
      </div>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>THE WARDROBE</h2>
        <div className={styles.statusIndicator}>
          <div className={styles.led}></div>
          <span>ONLINE</span>
        </div>
      </div>

      <div className={styles.tabs}>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
              {activeTab === tab.id && <ChevronRight size={16} className={styles.arrow} />}
            </button>
          );
        })}
      </div>

      <div className={styles.content}>
        <h3 className={styles.sectionTitle}>
          SELECT {activeTab.toUpperCase()}
          <span className={styles.sectionSubtitle}> // COLOR DATA</span>
        </h3>
        
        <div className={styles.scrollArea}>
          {renderOptions()}
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.randomizeBtn} onClick={onRandomize}>
          RANDOMIZE
        </button>
        <button className={styles.mintBtn}>
          MINT CHARACTER
        </button>
      </div>
    </aside>
  );
};

export default WardrobeSidebar;
