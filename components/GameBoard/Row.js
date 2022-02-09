import React from 'react';

// * Components
import Tile from './Tile';

// * Sass
import styles from './Row.module.scss';

export default function Row(props) {
  let line = props.line.split('');

  return (
    <div className={styles.row}>
      {line.map((letter, square) => (
        <Tile
          key={props.row.toString() + square.toString()}
          letter={letter}
          matches={props.matches}
        />
      ))}
    </div>
  );
}
