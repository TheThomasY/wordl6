import React from 'react';

// * Sass
import styles from './Tile.module.scss';

export default function Tile(props) {
  let tileStyle = {};

  if (props.matches[props.letter] === 0) {
    tileStyle = { backgroundColor: '#3e9f1c', color: 'white' };
  }

  if (props.matches[props.letter] === 1) {
    tileStyle = { backgroundColor: '#c39318', color: 'white' };
  }

  return (
    <div
      className={
        styles.tile +
        ' ' +
        (props.letter !== ' '
          ? styles['tile-active'] + ' ' + styles['scale-up-center']
          : '')
      }
      style={tileStyle}
    >
      {props.letter}
    </div>
  );
}
