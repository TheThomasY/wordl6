// * React
import React, { useState, useEffect } from 'react';

// * Sass
import styles from './Tile.module.scss';

export default function Tile(props) {
  const [tileStyle, setTileStyle] = useState({});

  useEffect(() => {
    if (props.colour === 2) {
      if (!props.darkMode) {
        setTileStyle({
          backgroundColor: '#3e9f1c',
          color: 'white',
          border: 'none',
        });
      } else {
        setTileStyle({
          backgroundColor: '#538d4e',
          color: 'white',
          border: 'none',
        });
      }
    } else if (props.colour === 1) {
      if (!props.darkMode) {
        setTileStyle({
          backgroundColor: '#c39318',
          color: 'white',
          border: 'none',
        });
      } else {
        setTileStyle({
          backgroundColor: '#b59f3b',
          color: 'white',
          border: 'none',
        });
      }
    } else if (props.colour === 0) {
      if (!props.darkMode) {
        setTileStyle({
          backgroundColor: '#787c7e',
          color: 'white',
          border: 'none',
        });
      } else {
        setTileStyle({
          backgroundColor: '#3a3a3c',
          color: 'white',
          border: 'none',
        });
      }
    }
  }, [props.colour]);

  return (
    <div
      className={
        styles.tile +
        ' ' +
        (props.letter !== ' '
          ? styles['tile-active'] + ' ' + styles['scale-up-center']
          : '') +
        ' ' +
        (props.colour || props.colour === 0
          ? styles['flip-horizontal-top']
          : '') +
        ' ' +
        (props.darkMode ? styles.dark : '')
      }
      style={tileStyle}
    >
      {props.letter}
    </div>
  );
}
