import React from 'react';

import styles from './Row.module.scss';

export default function Row(props) {
  let line = props.line;

  return (
    <div className={styles.row}>
      {line.map((letter, square) => (
        <div
          key={props.row.toString() + square.toString()}
          className={styles.tile}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}
