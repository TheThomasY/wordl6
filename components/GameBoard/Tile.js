// * React
import React, { useState, useEffect } from 'react';

// * Sass
import styles from './Tile.module.scss';

export default function Tile(props) {
  const [tileStyle, setTileStyle] = useState({});

  useEffect(() => {
    if (props.matches[props.letter] === 0) {
      setTileStyle({
        backgroundColor: '#3e9f1c',
        color: 'white',
        border: 'none',
      });
    } else if (props.matches[props.letter] === 1) {
      setTileStyle({
        backgroundColor: '#c39318',
        color: 'white',
        border: 'none',
      });
    } else if (props.matches[props.letter] === -1) {
      setTileStyle({
        backgroundColor: '#787c7e',
        color: 'white',
        border: 'none',
      });
    }
  }, [props.matches]);

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
