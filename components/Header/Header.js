import React from 'react';

// Css
import styles from './Header.module.scss';

// React Icons
import { IoIosStats } from 'react-icons/io';

export default function Header(props) {
  const toggleStats = () => {
    props.toggleStats();
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Wordl6</h1>
      <div onClick={toggleStats}>
        <IoIosStats size={'2rem'} />
      </div>
    </div>
  );
}
