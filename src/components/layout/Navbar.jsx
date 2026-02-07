import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Hexagon, User, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import Logo from '../../assets/logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoAndBrand}>
        <img src={Logo} alt="Logo" className={styles.logoIcon} size={32} />
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
  );
};

export default Navbar;