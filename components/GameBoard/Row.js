import React from 'react';

import styles from './Row.module.scss';

export default function Row() {
  return (
    <div className={styles.row}>
      <div className={styles.tile}></div>
      <div className={styles.tile}></div>
      <div className={styles.tile}></div>
      <div className={styles.tile}></div>
      <div className={styles.tile}></div>
      <div className={styles.tile}></div>
    </div>
  );
}
