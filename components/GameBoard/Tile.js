// * React
import React, { useState, useEffect } from 'react';

// * Sass
import styles from './Tile.module.scss';

export default function Tile(props) {
  const [tileStyle, setTileStyle] = useState({});

  useEffect(() => {
    if (!props.colour) {
      setTileStyle({
        backgroundColor: 'transparent',
      });
    } else {
      setTileStyle({
        color: 'white',
        border: 'none',
      });
    }

    if (props.colour === 2) {
      if (!props.darkMode) {
        // backgroundColor: '#6aaa64',
        setTileStyle({
          color: 'white',
          border: 'none',
        });
      } else {
        setTileStyle((prevTileStyle) => {
          return {
            ...prevTileStyle,
            backgroundColor: '#538d4e',
          };
        });
      }
    } else if (props.colour === 1) {
      if (!props.darkMode) {
        setTileStyle((prevTileStyle) => {
          return {
            ...prevTileStyle,
            backgroundColor: '#c9b458',
          };
        });
      } else {
        setTileStyle((prevTileStyle) => {
          return {
            ...prevTileStyle,
            backgroundColor: '#b59f3b',
          };
        });
      }
    } else if (props.colour === 0) {
      if (!props.darkMode) {
        setTileStyle((prevTileStyle) => {
          return {
            ...prevTileStyle,
            backgroundColor: '#787c7e',
          };
        });
      } else {
        setTileStyle((prevTileStyle) => {
          return {
            ...prevTileStyle,
            backgroundColor: '#3a3a3c',
          };
        });
      }
    }
  }, [props.colour, props.darkMode]);

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
