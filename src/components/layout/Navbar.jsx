import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, User, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import Logo from '../../assets/logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Scroll logic: show when scrolling up or at the top, hide when scrolling down
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY.current && window.scrollY > 100 && !isOpen) {
          setShowNavbar(false); // Scrolling down
        } else {
          setShowNavbar(true); // Scrolling up
        }
        lastScrollY.current = window.scrollY;
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [isOpen]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop Overlay */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}

      <nav className={`${styles.navbar} ${!showNavbar ? styles.hidden : ''}`}>
        <div className={styles.logoAndBrand}>
          <img src={Logo} alt="Logo" className={styles.logoIcon} />
          <Link to="/" className={styles.brand}>ChainCrafter</Link>
        </div>

        <div className={styles.menuIcon} onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <Link to="/ai-lab" className={styles.navLink} onClick={() => setIsOpen(false)}>
            <Zap size={18} />
            <span>AI Lab</span>
          </Link>
          <Link to="/forge" className={styles.navLink} onClick={() => setIsOpen(false)}>
            <User size={18} />
            <span>The Forge</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;