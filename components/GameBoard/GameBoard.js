import React from 'react';

import Row from './Row';

import styles from './GameBoard.module.scss';

export default function GameBoard(props) {
  const rows = [1, 2, 3, 4, 5, 6];
  return (
    <div className={styles.gameBoard}>
      <div className={styles.gameGrid}>
        {rows.map((row) => (
          <Row
            key={row}
            line={props.board[row]}
            row={row}
            matches={props.matches}
          />
        ))}
      </div>
    </div>
  );
}
