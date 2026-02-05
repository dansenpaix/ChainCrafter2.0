import React from 'react';
import { Layers, Zap, Download, Database, Image as ImageIcon, Users } from 'lucide-react';
import styles from './FeaturesSection.module.css';

const FEATURES = [
  {
    icon: Layers,
    title: '500+ Traits',
    description: 'Mix and match from our extensive library of pixel-perfect traits.'
  },
  {
    icon: Zap,
    title: 'AI Powered',
    description: 'Transform any photo into a matching pixel character instantly.'
  },
  {
    icon: Download,
    title: 'Instant Export',
    description: 'Download your creation in multiple sizes and formats.'
  },
  {
    icon: Database,
    title: 'Web3 Ready',
    description: 'Export metadata-ready assets for NFT minting.'
  },
  {
    icon: ImageIcon,
    title: 'Dynamic Backgrounds',
    description: 'Choose from cyberpunk cities to zen gardens.'
  },
  {
    icon: Users,
    title: 'Community Gallery',
    description: 'Share and discover creations from the community.'
  }
];

const FeaturesSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>WHY CHAINCRAFTER?</h2>
      <p className={styles.subtitle}>
        The most advanced pixel art character creator with Web3-ready exports.
      </p>
      
      <div className={styles.grid}>
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Icon size={32} />
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
