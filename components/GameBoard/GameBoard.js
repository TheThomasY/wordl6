import React from 'react';

import Row from './Row';

import styles from './GameBoard.module.scss';

export default function GameBoard() {
  return (
    <div className={styles.gameBoard}>
      <div className={styles.gameGrid}>
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}
