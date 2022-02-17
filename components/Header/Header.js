import React from 'react';

// Css
import styles from './Header.module.scss';

// React Icons
import { IoIosStats } from 'react-icons/io';
import { AiOutlineFire } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';

export default function Header(props) {
  const toggleStats = () => {
    props.toggleStats();
  };

  return (
    <div className={styles.header}>
      <div className={styles['header-left']}>
        <div className={styles.help}>
          <BiHelpCircle size={'3rem'} />
        </div>
        <div className={styles.streaks} onClick={toggleStats}>
          <AiOutlineFire size={'3.5rem'} />
          <div className={styles['streak-count']}>0</div>
        </div>
      </div>
      <h1 className={styles.title}>Wordl6</h1>
      <div className={styles['header-right']}>
        <div className={styles.stats} onClick={toggleStats}>
          <IoIosStats size={'3rem'} />
        </div>
        <div className={styles.settings}>
          <FiSettings size={'2.5rem'} />
        </div>
      </div>
    </div>
  );
}
