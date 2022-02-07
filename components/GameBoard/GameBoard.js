import React from 'react';

import styles from './GameBoard.module.scss';

export default function GameBoard() {
  return (
    <div className={styles.gameBoard}>
      <div className={styles.gameGrid}>
        <div className={styles.row}>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
          <div className={styles.tile}></div>
        </div>
      </div>
    </div>
  );
}
