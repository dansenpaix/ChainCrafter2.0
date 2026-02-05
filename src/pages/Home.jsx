import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import LegendaryCarousel from '../components/landing/LegendaryCarousel';
import FeaturesSection from '../components/landing/FeaturesSection';
import AiTeaser from '../components/landing/AiTeaser';

const Home = () => {
  return (
    <>
      <HeroSection />
      <LegendaryCarousel />
      <FeaturesSection />
      <AiTeaser />
    </>
  );
};

export default Home;
