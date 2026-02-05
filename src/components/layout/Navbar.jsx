import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Hexagon, User } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoAndBrand}>
        <Hexagon className={styles.logoIcon} size={32} />
        <Link to="/" className={styles.brand}>ChainCrafter</Link>
      </div>
      
      <div className={styles.navLinks}>
        <Link to="/ai-lab" className={styles.navLink}>
          <Zap size={18} />
          <span>AI Lab</span>
        </Link>
        <Link to="/forge" className={styles.navLink}>
          <User size={18} />
          <span>The Forge</span>
        </Link>
      </div>

      <button className={styles.connectButton}>
        Connect Wallet
      </button>
    </nav>
  );
};

export default Navbar;
