import React from 'react';

// Css
import styles from './Header.module.scss';

// React Icons
import { IoIosStats } from 'react-icons/io';
import { AiOutlineFire } from 'react-icons/ai';

export default function Header(props) {
  const toggleStats = () => {
    props.toggleStats();
  };

  return (
    <div className={styles.header}>
      <div className={styles.streaks}>
        <AiOutlineFire size={'3rem'} />
        <div className=''>0</div>
      </div>
      <h1 className={styles.title}>Wordl6</h1>
      <div className={styles.stats} onClick={toggleStats}>
        <IoIosStats size={'3rem'} />
      </div>
    </div>
  );
}
