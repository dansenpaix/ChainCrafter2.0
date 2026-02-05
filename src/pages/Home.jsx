import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import LegendaryCarousel from '../components/landing/LegendaryCarousel';
import AiTeaser from '../components/landing/AiTeaser';

const Home = () => {
  return (
    <>
      <HeroSection />
      <LegendaryCarousel />
      <AiTeaser />
    </>
  );
};

export default Home;
