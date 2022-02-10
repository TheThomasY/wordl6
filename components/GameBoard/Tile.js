import React from 'react';

// * Sass
import styles from './Tile.module.scss';

export default function Tile(props) {
  let tileStyle = {};

  console.log(Object.keys(props.matches).length);

  if (props.matches[props.letter] === 0) {
    tileStyle = { backgroundColor: '#3e9f1c', color: 'white', border: 'none' };
  } else if (props.matches[props.letter] === 1) {
    tileStyle = { backgroundColor: '#c39318', color: 'white', border: 'none' };
  } else if (props.matches[props.letter] === -1) {
    tileStyle = { backgroundColor: '#787c7e', color: 'white', border: 'none' };
  }

  return (
    <div
      className={
        styles.tile +
        ' ' +
        (props.letter !== ' '
          ? styles['tile-active'] + ' ' + styles['scale-up-center']
          : '') +
        ' ' +
        (Object.keys(props.matches).length === 0
          ? ''
          : styles['flip-horizontal-top'])
      }
      style={tileStyle}
    >
      {props.letter}
    </div>
  );
}
